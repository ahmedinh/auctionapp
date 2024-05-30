package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.model.Bid;
import ba.atlant.auctionapp.projection.BidProjection;
import ba.atlant.auctionapp.projection.BidTableProjection;
import ba.atlant.auctionapp.service.BidService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bid")
@Tag(name = "Bids Controller")
@CrossOrigin("*")
public class BidController {
    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @GetMapping(value = "/user/all")
    @Operation(summary = "All bids created by single user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<BidProjection>> getUserBids(@RequestHeader("Authorization") String token) {
        return bidService.getUserBids(token);
    }

    @GetMapping(value = "/product/all")
    @Operation(summary = "All bids for user product on product overview page", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Page<BidTableProjection>> getProductBids(@RequestHeader("Authorization") String token,
                                                                   @RequestParam(name = "productId") Long productId,
                                                                   @RequestParam(defaultValue = "0") int page,
                                                                   @RequestParam(defaultValue = "5") int size) {
        return bidService.getProductBids(token, productId, page, size);
    }
}