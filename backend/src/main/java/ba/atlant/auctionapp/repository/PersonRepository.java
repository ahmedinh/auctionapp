package ba.atlant.auctionapp.repository;

import ba.atlant.auctionapp.model.Person;
import ba.atlant.auctionapp.projection.PersonProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long>, PagingAndSortingRepository<Person, Long> {
    boolean existsByEmail(String email);

    Optional<Person> findByEmail(String email);

    boolean existsByIdAndActiveIsTrue(Long id);

    @Query("""
            SELECT p.firstName as firstName,
            p.lastName as lastName,
            p.email as email,
            DAY(p.birthDate) as birthDay,
            MONTH(p.birthDate) as birthMonth,
            YEAR(p.birthDate) as birthYear,
            p.phoneNumber as phoneNumber,
            p.shippingAddress as shippingStreet,
            p.shippingCity as shippingCity,
            p.zipCode as shippingZipCode,
            p.state as shippingState,
            p.country as shippingCountry,
            p.cardName as cardName,
            p.cardNumber as cardNumber,
            p.expirationMonth as expirationMonth,
            p.expirationYear as expirationYear,
            p.CVV as CVC
            FROM Person p
            WHERE p.id = :userId
            """)
    PersonProjection getPersonInformation(@Param("userId") Long userId);
}
