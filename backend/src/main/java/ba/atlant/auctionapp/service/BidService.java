package ba.atlant.auctionapp.service;

import ba.atlant.auctionapp.model.Bid;
import ba.atlant.auctionapp.model.Person;
import ba.atlant.auctionapp.projection.BidProjection;
import ba.atlant.auctionapp.repository.BidRepository;
import ba.atlant.auctionapp.repository.PersonRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BidService {
    private final BidRepository bidRepository;
    private final PersonRepository personRepository;
    private final PersonService personService;

    public BidService(BidRepository bidRepository, PersonRepository personRepository, PersonService personService) {
        this.bidRepository = bidRepository;
        this.personRepository = personRepository;
        this.personService = personService;
    }

    public ResponseEntity<List<BidProjection>> getUserBids(String token) {
        Integer userId =personService.getUserId(token);
        Optional<Person> optionalPerson = personRepository.findById(Long.valueOf(userId));
        if (optionalPerson.isEmpty())
            throw new IllegalArgumentException("No user found with provided ID.");
        return ResponseEntity.ok(bidRepository.getUserBids(Long.valueOf(userId)));
    }
}