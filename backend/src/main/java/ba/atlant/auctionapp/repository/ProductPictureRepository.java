package ba.atlant.auctionapp.repository;

import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.model.ProductPicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductPictureRepository extends JpaRepository<ProductPicture, Long>, PagingAndSortingRepository<ProductPicture, Long> {
    List<ProductPicture> findAllByProductId(Long id);
}
