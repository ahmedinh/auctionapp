package ba.atlant.auctionapp.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record ProductSmallDTO (
    Long id,
    String name,
    String description,
    BigDecimal startPrice,
    LocalDateTime createdAt,
    LocalDate auctionStart,
    LocalDate auctionEnd,
    String size,
    String color,
    String url,
    Integer bidCount,
    BigDecimal highestBid
) {
}
