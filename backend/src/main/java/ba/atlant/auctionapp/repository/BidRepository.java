package ba.atlant.auctionapp.repository;

import ba.atlant.auctionapp.model.Bid;
import ba.atlant.auctionapp.model.Person;
import ba.atlant.auctionapp.model.Product;
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
            SELECT b.product.id as productId,
            b.product.name as productName,
            pp.url as productPictureUrl,
            b.product.auctionEnd as auctionEnd,
            b.amount as userPrice,
            COUNT(bb.id) as noOfBids,
            MAX(bb.amount) as maxBid
            FROM Bid b
            JOIN ProductPicture pp ON pp.id = (
                SELECT MIN(pp2.id)
                FROM ProductPicture pp2
                WHERE pp2.product.id = b.product.id
            )
            LEFT JOIN Bid bb ON bb.product.id = b.product.id
            WHERE b.person.id = :userId
            GROUP BY b.product.id, b.product.name, pp.url, b.product.auctionEnd, b.amount
            """)
    List<BidProjection> getUserBids(@Param("userId") Long userId);

    Optional<Bid> findTopByProductIdOrderByAmountDesc(Long productId);
}