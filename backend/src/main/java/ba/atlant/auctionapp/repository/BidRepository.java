package ba.atlant.auctionapp.repository;

import ba.atlant.auctionapp.model.Bid;
import ba.atlant.auctionapp.model.Person;
import ba.atlant.auctionapp.projection.BidProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Long>, PagingAndSortingRepository<Bid, Long> {
    List<Bid> findAllByProductId(Long id);

    Optional<Bid> findByPersonIdAndProductId(Long personId, Long productId);

    List<Bid> findAllByPerson(Person person);

    @Query("""
            SELECT b.product.id as id,
            b.product.name as productName,
            (select pp.url from ProductPicture pp WHERE pp.id = (select min(pp2.id) FROM ProductPicture pp2 WHERE pp2.product.id = b.product.id)) as productPictureUrl,
            b.product.auctionEnd as auctionEnd,
            b.amount as userPrice,
            (SELECT COUNT(bb.id) FROM Bid bb WHERE bb.product.id = b.product.id) as noOfBids,
            (SELECT MAX(bb.amount) FROM Bid bb WHERE bb.product.id = b.product.id) as maxBid
            FROM Bid b
            WHERE b.person.id = :userId
            """)
    List<BidProjection> getUserBids(@Param("userId") Long userId);
}