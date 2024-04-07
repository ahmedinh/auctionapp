package ba.atlant.auctionapp.repository;

import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.projection.ProductProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, PagingAndSortingRepository<Product, Long> {
    @Query("""
            SELECT p.id as id,
            p.name as name,
            p.description as description,
            p.startPrice as startPrice,
            p.createdAt as createdAt,
            p.auctionStart as auctionStart,
            p.auctionEnd as auctionEnd,
            p.size as size,
            p.color as color,
            i.url as url
            FROM Product p
            INNER JOIN ProductPicture i
            ON p.id = i.product.id
            WHERE i.id = ((SELECT MIN(ii.id) FROM ProductPicture ii WHERE ii.product.id = p.id))
            ORDER BY p.createdAt DESC
            """)
    Page<ProductProjection> getNewArrivalsProducts(Pageable pageable);

    @Query("""
            SELECT p.id as id,
            p.name as name,
            p.description as description,
            p.startPrice as startPrice,
            p.createdAt as createdAt,
            p.auctionStart as auctionStart,
            p.auctionEnd as auctionEnd,
            p.size as size,
            p.color as color,
            i.url as url
            FROM Product p
            INNER JOIN ProductPicture i
            ON p.id = i.product.id
            WHERE i.id = ((SELECT MIN(ii.id) FROM ProductPicture ii WHERE ii.product.id = p.id))
            ORDER BY p.auctionEnd ASC
            """)
    Page<ProductProjection> getLastChanceProducts(Pageable pageable);

    @Query("""
            SELECT p.id as id,
            p.name as name,
            p.description as description,
            p.startPrice as startPrice,
            p.createdAt as createdAt,
            p.auctionStart as auctionStart,
            p.auctionEnd as auctionEnd,
            p.size as size,
            p.color as color,
            i.url as url
            FROM Product p
            INNER JOIN ProductPicture i
            ON p.id = i.product.id
            WHERE p.subCategory.category.id = :categoryId AND i.id = ((SELECT MIN(ii.id) FROM ProductPicture ii WHERE ii.product.id = p.id))
            ORDER BY p.auctionEnd ASC
            """)
    Page<ProductProjection> getProductsForCategory(@Param("categoryId") Long categoryId, Pageable pageable);

    @Query("""
            SELECT p.id as id,
            p.name as name,
            p.description as description,
            p.startPrice as startPrice,
            p.createdAt as createdAt,
            p.auctionStart as auctionStart,
            p.auctionEnd as auctionEnd,
            p.size as size,
            p.color as color,
            i.url as url
            FROM Product p
            INNER JOIN ProductPicture i
            ON p.id = i.product.id
            WHERE p.subCategory.id = :subCategoryId AND i.id = ((SELECT MIN(ii.id) FROM ProductPicture ii WHERE ii.product.id = p.id))
            ORDER BY p.auctionEnd ASC
            """)
    Page<ProductProjection> getProductsForSubCategory(@Param("subCategoryId") Long subCategoryId, Pageable pageable);

    @Query("""
            SELECT p.id as id,
            p.name as name,
            p.description as description,
            p.startPrice as startPrice,
            p.createdAt as createdAt,
            p.auctionStart as auctionStart,
            p.auctionEnd as auctionEnd,
            p.size as size,
            p.color as color,
            i.url as url
            FROM Product p
            INNER JOIN ProductPicture i
            ON p.id = i.product.id
            WHERE i.id = ((SELECT MIN(ii.id) FROM ProductPicture ii WHERE ii.product.id = p.id))
            AND calculate_levenshtein(:query, p.name) <= :threshold ORDER BY calculate_levenshtein(:query, p.name) ASC
            """)
    Page<ProductProjection> searchProducts(@Param("query") String query, Pageable pageable, @Param("threshold") Integer threshold);


}
