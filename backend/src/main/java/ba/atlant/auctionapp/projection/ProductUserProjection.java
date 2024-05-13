package ba.atlant.auctionapp.projection;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public interface ProductUserProjection {
    Long getId();
    String getName();
    BigDecimal getStartPrice();
    LocalDate getAuctionEnd();
    String getUrl();
    BigDecimal getMaxBid();
    Integer getNoOfBids();
    String getTimeLeft();
}