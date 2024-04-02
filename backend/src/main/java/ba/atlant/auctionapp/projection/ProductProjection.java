package ba.atlant.auctionapp.projection;

import ba.atlant.auctionapp.model.ProductPicture;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public interface ProductProjection {
    Long getId();
    String getName();
    String getDescription();
    BigDecimal getStartPrice();
    LocalDateTime getCreatedAt();
    LocalDateTime getAuctionStart();
    LocalDateTime getAuctionEnd();
    String getSize();
    String getColor();
    String getUrl();
}