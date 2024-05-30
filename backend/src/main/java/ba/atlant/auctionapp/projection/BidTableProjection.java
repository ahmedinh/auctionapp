package ba.atlant.auctionapp.projection;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface BidTableProjection {
    Long getId();
    String getPersonFirstName();
    String getPersonLastName();
    BigDecimal getBidAmount();
    LocalDateTime getBidTimeStamp();
    String getPersonPictureUrl();
}