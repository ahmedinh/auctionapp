package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.config.jwt.JwtUtils;
import ba.atlant.auctionapp.model.Bid;
import ba.atlant.auctionapp.model.Person;
import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.projection.BidProjection;
import ba.atlant.auctionapp.repository.BidRepository;
import ba.atlant.auctionapp.repository.PersonRepository;
import ba.atlant.auctionapp.repository.ProductRepository;
import ba.atlant.auctionapp.request.BidRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BidService {
    private final BidRepository bidRepository;
    private final ProductRepository productRepository;
    private final PersonRepository personRepository;
    private final JwtUtils jwtUtils;

    public BidService(BidRepository bidRepository, ProductRepository productRepository, PersonRepository personRepository, JwtUtils jwtUtils) {
        this.bidRepository = bidRepository;
        this.productRepository = productRepository;
        this.personRepository = personRepository;
        this.jwtUtils = jwtUtils;
    }

    public ResponseEntity<List<BidProjection>> getUserBids(String token) {
        Long userId = Long.valueOf(jwtUtils.getUserIdFromJwtToken(token.substring(7)));
        personRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("No user found with provided ID."));
        return ResponseEntity.ok(bidRepository.getUserBids(userId));
    }

    private boolean isBidValid(BidRequest bidRequest, Product product) {
        if (product.getAuctionEnd().isBefore(LocalDate.now()))
            throw new IllegalArgumentException("Auction has ended for this product");

        Optional<Bid> optionalMaxBid = bidRepository.findTopByProductIdOrderByAmountDesc(bidRequest.getProductId());

        boolean lowerThanHighestBid = optionalMaxBid.isPresent() && bidRequest.getAmount().compareTo(optionalMaxBid.get().getAmount().add(BigDecimal.valueOf(0.99))) < 1;
        boolean lowerThanStartPrice = optionalMaxBid.isEmpty() && bidRequest.getAmount().compareTo(product.getStartPrice()) < 0;

        return !(lowerThanHighestBid || lowerThanStartPrice);
    }

    public boolean isBidPlaced(BidRequest bidRequest) {
        Product product = productRepository.findById(bidRequest.getProductId()).orElseThrow(() -> new ResourceNotFoundException("No product found with provided ID."));
        Person person = personRepository.findById(bidRequest.getUserId()).orElseThrow(() -> new ResourceNotFoundException("No user found with provided ID."));
        if (isBidValid(bidRequest, product)) {
            Optional<Bid> optionalBid = bidRepository.findByPersonIdAndProductId(bidRequest.getUserId(),bidRequest.getProductId());
            Bid bid = optionalBid.orElseGet(Bid::new);
            bid.setAmount(bidRequest.getAmount());
            bid.setProduct(product);
            bid.setPerson(person);
            bidRepository.save(bid);
            return true;
        }
        return false;
    }

    public boolean placeBid(Long userId, Long productId, BigDecimal amount) {
        Optional<Person> optionalPerson = personRepository.findById(Long.valueOf(userId));
        if (optionalPerson.isEmpty())
            throw new IllegalArgumentException("No user found with provided ID.");
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty())
            throw new IllegalArgumentException("No product found with provided ID.");
        Product product = optionalProduct.get();
        if (product.getAuctionEnd().isBefore(LocalDate.now()))
            throw new IllegalArgumentException("Auction has ended for this product");

        Optional<Bid> optionalBid = bidRepository.findByPersonIdAndProductId(userId,productId);
        Bid bid = optionalBid.orElseGet(Bid::new);
        if (bid.getAmount() != null && bid.getAmount().add(BigDecimal.valueOf(1)).compareTo(amount) > 0) {
            System.out.println("You tried to place a lower bid.");
            return false;
        }
        bid.setAmount(amount);
        bid.setProduct(product);
        bid.setPerson(optionalPerson.get());
        bidRepository.save(bid);
        return true;
    }
}