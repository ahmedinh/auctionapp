package ba.atlant.auctionapp.projection;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface BidProjection {
    Long getProductId();
    String getProductName();
    String getProductPictureUrl();
    LocalDate getAuctionEnd();
    BigDecimal getUserPrice();
    Integer getNoOfBids();
    BigDecimal getMaxBid();
}