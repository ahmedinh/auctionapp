package ba.atlant.auctionapp.repository;

import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.model.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long>, PagingAndSortingRepository<SubCategory, Long> {
    List<SubCategory> findSubCategoriesByCategory(Category category);
}
