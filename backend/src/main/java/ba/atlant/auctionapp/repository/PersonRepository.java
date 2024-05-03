package ba.atlant.auctionapp.repository;

import ba.atlant.auctionapp.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long>, PagingAndSortingRepository<Person, Long> {
    boolean existsByEmail(String email);
    Optional<Person> findByEmail(String email);
    boolean existsByIdAndActiveIsTrue(Long id);
}
