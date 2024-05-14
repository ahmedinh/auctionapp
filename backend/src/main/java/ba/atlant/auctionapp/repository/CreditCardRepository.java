package ba.atlant.auctionapp.repository;

import ba.atlant.auctionapp.model.CreditCard;
import ba.atlant.auctionapp.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Long>, PagingAndSortingRepository<CreditCard, Long> {
    Optional<CreditCard> findByPerson(Person person);
}
