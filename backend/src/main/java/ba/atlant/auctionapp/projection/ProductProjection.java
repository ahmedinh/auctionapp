package ba.atlant.auctionapp.projection;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public interface ProductProjection {
    Long getId();
    String getName();
    String getDescription();
    BigDecimal getStartPrice();
    LocalDateTime getCreatedAt();
    LocalDate getAuctionStart();
    LocalDate getAuctionEnd();
    String getSize();
    String getColor();
    String getUrl();
    Integer getBidCount();
}