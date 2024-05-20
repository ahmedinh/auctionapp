package ba.atlant.auctionapp.repository;

import ba.atlant.auctionapp.model.Category;
import ba.atlant.auctionapp.model.SubCategory;
import ba.atlant.auctionapp.projection.SubCategoryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long>, PagingAndSortingRepository<SubCategory, Long> {
    Optional<SubCategory> findByName(String name);

    Optional<SubCategory> findByNameAndCategory(String name, Category category);

    List<SubCategory> findSubCategoriesByCategory(Category category);

    @Query("""
        SELECT sc.id as id, sc.name as name, COUNT(p) as noOfProducts
        FROM SubCategory sc LEFT JOIN Product p ON p.subCategory.id = sc.id
        WHERE sc.category.id=:categoryId
        GROUP BY sc
        """)
    List<SubCategoryProjection> getSubCategoriesForSearch(@Param("categoryId") Long categoryId);
}
