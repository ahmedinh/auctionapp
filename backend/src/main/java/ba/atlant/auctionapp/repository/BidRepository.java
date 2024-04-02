package ba.atlant.auctionapp.repository;

import ba.atlant.auctionapp.model.Bid;
import ba.atlant.auctionapp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long>, PagingAndSortingRepository<Bid, Long> {
    List<Bid> findAllByProductId(Long id);
}
