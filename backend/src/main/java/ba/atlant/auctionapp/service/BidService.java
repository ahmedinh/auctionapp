package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.config.jwt.JwtUtils;
import ba.atlant.auctionapp.model.Bid;
import ba.atlant.auctionapp.model.Person;
import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.projection.BidProjection;
import ba.atlant.auctionapp.projection.BidTableProjection;
import ba.atlant.auctionapp.repository.BidRepository;
import ba.atlant.auctionapp.repository.PersonRepository;
import ba.atlant.auctionapp.repository.ProductRepository;
import ba.atlant.auctionapp.request.BidRequest;
import ba.atlant.auctionapp.response.BidResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
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
        Long userId = Long.valueOf(jwtUtils.getUserIdFromJwtToken(token.substring(7)));
        personRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("No user found with provided ID."));
        return ResponseEntity.ok(bidRepository.getUserBids(userId));
    }

    private BidResponse isBidValid(BidRequest bidRequest, Product product) {
        if (product.getAuctionEnd().isBefore(LocalDate.now()))
            throw new IllegalArgumentException("Auction has ended for this product");

        Optional<Bid> optionalMaxBid = bidRepository.findTopByProductIdOrderByAmountDesc(bidRequest.getProductId());

        boolean lowerThanHighestBid = optionalMaxBid.isPresent() && bidRequest.getAmount().compareTo(optionalMaxBid.get().getAmount().add(BigDecimal.valueOf(0.99))) < 1;
        boolean lowerThanStartPrice = optionalMaxBid.isEmpty() && bidRequest.getAmount().compareTo(product.getStartPrice()) < 0;

        String message = "Congrats! You are the highest bidder!";
        if (lowerThanHighestBid)
            message = "There are higher bids than yours. You could give a second try!";
        else if (lowerThanStartPrice)
            message = "Bid cannot be lower than start price!";
        return new BidResponse(!(lowerThanHighestBid || lowerThanStartPrice), message);
    }

    public BidResponse isBidPlaced(BidRequest bidRequest) {
        Product product = productRepository.findById(bidRequest.getProductId()).orElseThrow(() -> new ResourceNotFoundException("No product found with provided ID."));
        Person person = personRepository.findById(bidRequest.getUserId()).orElseThrow(() -> new ResourceNotFoundException("No user found with provided ID."));
        BidResponse bidResponse = isBidValid(bidRequest,product);
        if (bidResponse.isAccepted()) {
            Optional<Bid> optionalBid = bidRepository.findByPersonIdAndProductId(bidRequest.getUserId(),bidRequest.getProductId());
            Bid bid = optionalBid.orElseGet(Bid::new);
            bid.setAmount(bidRequest.getAmount());
            bid.setBidTimeStamp(LocalDateTime.now());
            bid.setProduct(product);
            bid.setPerson(person);
            bidRepository.save(bid);
        }
        return bidResponse;
    }

    public ResponseEntity<Page<BidTableProjection>> getProductBids(String token, Long productId, int page, int size) {
        Long userId = Long.valueOf(jwtUtils.getUserIdFromJwtToken(token.substring(7)));
        Person person = personRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Person not found for given ID."));
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found for given ID."));
        if (!product.getPerson().getId().equals(person.getId()))
            throw new AuthorizationServiceException("Provided person is not the owner of the product.");
        return ResponseEntity.ok(bidRepository.getBidsByProductId(productId, PageRequest.of(page, size)));
    }
}