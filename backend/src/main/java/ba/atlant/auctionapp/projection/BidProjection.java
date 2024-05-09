package ba.atlant.auctionapp.projection;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface BidProjection {
    Long getProductId();
    String getProductName();
    String getProductPictureUrl();
    LocalDateTime getAuctionEnd();
    BigDecimal getUserPrice();
    Integer getNoOfBids();
    BigDecimal getMaxBid();
}
