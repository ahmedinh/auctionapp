package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.config.jwt.JwtUtils;
import ba.atlant.auctionapp.projection.BidProjection;
import ba.atlant.auctionapp.repository.BidRepository;
import ba.atlant.auctionapp.repository.PersonRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidService {
    private final BidRepository bidRepository;
    private final PersonRepository personRepository;
    private final JwtUtils jwtUtils;

    public BidService(BidRepository bidRepository, PersonRepository personRepository, JwtUtils jwtUtils) {
        this.bidRepository = bidRepository;
        this.personRepository = personRepository;
        this.jwtUtils = jwtUtils;
    }

    public ResponseEntity<List<BidProjection>> getUserBids(String token) {
        Long userId = Long.valueOf(jwtUtils.getUserIdFromJwtToken(token.substring(7)));
        personRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("No user found with provided ID."));
        return ResponseEntity.ok(bidRepository.getUserBids(Long.valueOf(userId)));
    }
}