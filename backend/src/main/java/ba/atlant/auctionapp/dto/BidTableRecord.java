package ba.atlant.auctionapp.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record BidTableRecord (
        Long id,
        String personFirstName,
        String personLastName,
        BigDecimal bidAmount,
        LocalDateTime bidTimeStamp,
        String personPictureUrl
)
{}
