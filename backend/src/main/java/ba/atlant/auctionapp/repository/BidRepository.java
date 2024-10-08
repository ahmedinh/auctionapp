package ba.atlant.auctionapp.repository;

import ba.atlant.auctionapp.model.Bid;
import ba.atlant.auctionapp.model.Person;
import ba.atlant.auctionapp.projection.BidProjection;
import ba.atlant.auctionapp.projection.BidTableProjection;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Long>, PagingAndSortingRepository<Bid, Long> {
    List<Bid> findAllByProductId(Long id);

    Optional<Bid> findByPersonIdAndProductId(Long personId, Long productId);

    List<Bid> findAllByPerson(Person person);

    @Query(value = """
            SELECT b.product_id as productId,
            p.name as productName,
            (SELECT pp.url FROM product_picture pp WHERE pp.id = (SELECT MIN(pp2.id) FROM product_picture pp2 WHERE pp2.product_id = p.id)) as productPictureUrl,
            b.amount as userPrice,
            (SELECT COUNT(bb.id) FROM bid bb WHERE bb.product_id = p.id) as noOfBids,
            (SELECT MAX(bb.amount) FROM bid bb WHERE bb.product_id = p.id) as maxBid,
            get_time_left(p.auction_end) as timeLeft,
            p.is_paid AS isPaid
            FROM bid b
            JOIN product p ON b.product_id = p.id
            WHERE b.user_id = :userId
            ORDER BY b.product_id
            """, nativeQuery = true)
    List<BidProjection> getUserBids(@Param("userId") Long userId);

    Optional<Bid> findTopByProductIdOrderByAmountDesc(Long productId);

    @Query("""
            SELECT b.id as id,
            b.person.firstName as personFirstName,
            b.person.lastName as personLastName,
            b.amount as bidAmount,
            b.bidTimeStamp as bidTimeStamp,
            b.person.pictureUrl as personPictureUrl
            FROM Bid b
            WHERE b.product.id = :productId
            ORDER BY b.amount desc
            """)
    Page<BidTableProjection> getBidsByProductId(Long productId, Pageable pageable);
}