package ba.atlant.auctionapp.repository;

import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.projection.ProductProjection;
import ba.atlant.auctionapp.projection.ProductUserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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
            WHERE p.subCategory.category.id = :categoryId AND i.id = ((SELECT MIN(ii.id) FROM ProductPicture ii WHERE ii.product.id = p.id))
            ORDER BY (CASE WHEN p.auctionEnd >= CURRENT_TIMESTAMP THEN 0 ELSE 1 END), p.auctionEnd ASC
            """)
    Page<ProductProjection> getProductsForCategoryWithFutureAuctionEnd(@Param("categoryId") Long categoryId, Pageable pageable);

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
            SELECT p.name as name
            FROM Product p
            WHERE calculate_levenshtein(LOWER(:query), LOWER(p.name)) <= :maxThreshold AND calculate_levenshtein(LOWER(:query), LOWER(p.name)) > :minThreshold ORDER BY calculate_levenshtein(LOWER(:query), LOWER(p.name)) ASC
            LIMIT 1
            """)
    String getSuggestion(@Param("query") String query, @Param("maxThreshold") Integer maxThreshold, @Param("minThreshold") Integer minThreshold);

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
            AND LOWER(p.name) LIKE CONCAT('%', LOWER(:query), '%')
            """)
    Page<ProductProjection> searchProducts(@Param("query") String query, Pageable pageable);

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
            AND LOWER(p.name) LIKE CONCAT('%', LOWER(:query), '%')
            ORDER BY (CASE WHEN p.auctionEnd >= CURRENT_TIMESTAMP THEN 0 ELSE 1 END), p.auctionEnd ASC
            """)
    Page<ProductProjection> searchProductsWithFutureAuctionEnd(@Param("query") String query, Pageable pageable);

    @Query("""
            SELECT p.id as id,
            p.name as name,
            p.auctionEnd as auctionEnd,
            p.startPrice as startPrice,
            (SELECT MIN(pp.url) FROM ProductPicture pp WHERE pp.product.id = p.id) as url,
            COALESCE((SELECT MAX(b.amount) FROM Bid b WHERE b.product.id = p.id),0) as maxBid,
            COALESCE((SELECT COUNT(b.amount) FROM Bid b WHERE b.product.id = p.id),0) as noOfBids,
            get_time_left(p.auctionEnd) as timeLeft
            FROM Product p
            WHERE p.person.id = :userId AND p.auctionEnd > CURRENT_TIMESTAMP
            """)
    List<ProductUserProjection> getActiveUserProducts(@Param("userId") Long userId);

    @Query("""
            SELECT p.id as id,
            p.name as name,
            p.auctionEnd as auctionEnd,
            p.startPrice as startPrice,
            (SELECT MIN(pp.url) FROM ProductPicture pp WHERE pp.product.id = p.id) as url,
            COALESCE((SELECT MAX(b.amount) FROM Bid b WHERE b.product.id = p.id),0) as maxBid,
            COALESCE((SELECT COUNT(b.amount) FROM Bid b WHERE b.product.id = p.id),0) as noOfBids,
            get_time_left(p.auctionEnd) as timeLeft
            FROM Product p
            WHERE p.person.id = :userId AND p.auctionEnd < CURRENT_TIMESTAMP
            AND COALESCE((SELECT COUNT(b.amount) FROM Bid b WHERE b.product.id = p.id),0) > 0
            """)
    List<ProductUserProjection> getSoldUserProducts(@Param("userId") Long userId);

    Optional<Product> findByName(String name);

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
            i.url as url,
            COUNT(b.id) as bidCount
            FROM Product p
            INNER JOIN ProductPicture i ON p.id = i.product.id
            LEFT JOIN Bid b ON b.product.id = p.id
            WHERE i.id = (SELECT MIN(ii.id) FROM ProductPicture ii WHERE ii.product.id = p.id)
            AND p.auctionEnd > CURRENT_TIMESTAMP
            GROUP BY p.id, p.name, p.description, p.startPrice, p.createdAt, p.auctionStart, p.auctionEnd, p.size, p.color, i.url
            ORDER BY bidCount DESC, p.auctionEnd ASC
            LIMIT 3
            """)
    List<ProductProjection> getDefaultRecommendedProducts();

    /***
     * Query is designed to retrieve a list of products from a specific subcategory that a particular user has not bid on, or his bid is not the highest bid,
     * ensuring that these products are still active for auction (i.e., the auction has not ended).
     * It orders these products by the number of bids from other users, with those receiving the most bids listed first,
     * and then by the auction end time from the soonest to the latest.
     * This aims to show the most competitive and urgent products first.
     * @param userId
     * @param subCategoryId
     */
    @Query("""
            SELECT p.id as id,
            p.name as name,
            p.startPrice as startPrice,
            p.createdAt as createdAt,
            p.auctionStart as auctionStart,
            p.auctionEnd as auctionEnd,
            i.url as url,
            (SELECT COUNT(b.id) FROM Bid b WHERE b.product.id = p.id AND b.person.id <> :userId) AS bidCount
            FROM Product p
            INNER JOIN ProductPicture i
            ON p.id = i.product.id
            WHERE i.id = ((SELECT MIN(ii.id) FROM ProductPicture ii WHERE ii.product.id = p.id))
            AND p.subCategory.id = :subCategoryId
            AND p.id NOT IN
                    (SELECT b.product.id
                    FROM Bid b
                    WHERE b.product.id IN
                            (SELECT bb.product.id
                            FROM Bid bb GROUP BY bb.product.id HAVING MAX(bb.amount) = (SELECT MAX(bbb.amount) FROM Bid bbb WHERE bbb.product.id = bb.product.id AND bbb.person.id = :userId)))
            AND p.auctionEnd > CURRENT_TIMESTAMP
            AND p.person.id != :userId
            ORDER BY (SELECT COUNT(b.id) FROM Bid b WHERE b.product.id = p.id AND b.person.id <> :userId) DESC, p.auctionEnd ASC
    """)
    List<ProductProjection> getProductsFromPopularSubCategoryForUser(@Param("userId") Long userId, @Param("subCategoryId") Long subCategoryId);
}