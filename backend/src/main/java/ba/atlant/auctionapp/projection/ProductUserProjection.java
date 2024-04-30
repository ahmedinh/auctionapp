package ba.atlant.auctionapp.projection;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface ProductUserProjection {
    Long getId();
    String getName();
    BigDecimal getStartPrice();
    LocalDateTime getAuctionEnd();
    String getUrl();
    BigDecimal getMaxBid();
    Integer getNoOfBids();
}
