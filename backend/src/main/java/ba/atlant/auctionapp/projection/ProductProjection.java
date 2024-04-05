package ba.atlant.auctionapp.projection;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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