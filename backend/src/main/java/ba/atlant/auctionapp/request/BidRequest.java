package ba.atlant.auctionapp.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BidRequest {
    private Long userId;
    private Long productId;
    private BigDecimal amount;
}