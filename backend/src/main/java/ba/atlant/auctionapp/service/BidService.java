package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.config.jwt.JwtUtils;
import ba.atlant.auctionapp.model.Bid;
import ba.atlant.auctionapp.model.Person;
import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.projection.BidProjection;
import ba.atlant.auctionapp.repository.BidRepository;
import ba.atlant.auctionapp.repository.PersonRepository;
import ba.atlant.auctionapp.repository.ProductRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
        Long userId = jwtUtils.getUserIdFromJwtToken(token.substring(7));
        personRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("No user found with provided ID."));
        return ResponseEntity.ok(bidRepository.getUserBids(userId));
    }

    public boolean placeBid(Long userId, Long productId, BigDecimal amount) {
        Person person = personRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("No user found with provided ID."));
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("No product found with provided ID."));
        if (product.getAuctionEnd().isBefore(LocalDateTime.now()))
            throw new IllegalArgumentException("Auction has ended for this product");

        Optional<Bid> optionalBid = bidRepository.findByPersonIdAndProductId(userId,productId);
        Bid bid = optionalBid.orElseGet(Bid::new);

        Optional<Bid> optionalMaxBid = bidRepository.findTopByProductIdOrderByAmountDesc(productId);
        if (optionalMaxBid.isPresent() && amount.compareTo(optionalMaxBid.get().getAmount().add(BigDecimal.valueOf(0.99))) < 1) {
            System.out.println("You tried to place a lower bid.");
            return false;
        }
        if (bid.getAmount() != null && bid.getAmount().add(BigDecimal.valueOf(1)).compareTo(amount) > 0 ||
            amount.add(BigDecimal.valueOf(1)).compareTo(product.getStartPrice()) < 1) {
            System.out.println("You tried to place a lower bid.");
            return false;
        }
        bid.setAmount(amount);
        bid.setProduct(product);
        bid.setPerson(person);
        bidRepository.save(bid);
        return true;
    }
}