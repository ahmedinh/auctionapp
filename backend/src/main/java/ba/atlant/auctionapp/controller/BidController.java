package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.projection.BidProjection;
import ba.atlant.auctionapp.service.BidService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
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
}