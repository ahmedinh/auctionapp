package ba.atlant.auctionapp.repository;

import ba.atlant.auctionapp.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>, PagingAndSortingRepository<Category, Long> {
    @Query("""
            SELECT c
            FROM Category c
            WHERE (LOWER(c.name) LIKE CONCAT('%', LOWER(:query), '%'))
            """)
    List<Category> searchCategories(String query);

    Optional<Category> findByName(String name);
}
