package ba.atlant.auctionapp.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record BidRecord (
        Long productId,
        String productName,
        String productPictureUrl,
        LocalDate auctionEnd,
        BigDecimal userPrice,
        Integer noOfBids,
        BigDecimal maxBid,
        String timeLeft,
        boolean isPaid
)
{}
