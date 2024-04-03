package ba.atlant.auctionapp.repository;

import ba.atlant.auctionapp.model.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long>, PagingAndSortingRepository<SubCategory, Long> {
}
