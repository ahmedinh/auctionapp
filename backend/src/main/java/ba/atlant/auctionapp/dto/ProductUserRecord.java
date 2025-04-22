package ba.atlant.auctionapp.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ProductUserRecord(
        Long id,
        String name,
        BigDecimal startPrice,
        LocalDate auctionEnd,
        String url,
        BigDecimal maxBid,
        Integer noOfBids,
        String timeLeft
) {
}
