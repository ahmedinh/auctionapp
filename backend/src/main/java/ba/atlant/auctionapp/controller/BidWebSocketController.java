package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.request.BidRequest;
import ba.atlant.auctionapp.response.BidResponse;
import ba.atlant.auctionapp.service.BidService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin("*")
public class BidWebSocketController {
    private final BidService bidService;

    public BidWebSocketController(BidService bidService) {
        this.bidService = bidService;
    }

    @MessageMapping("/bid")
    @SendTo("/topic/bids")
    public BidResponse handleBidMessage(@Payload BidRequest bidRequest) {
        boolean isAccepted = bidService.placeBid(bidRequest);
        return new BidResponse(bidRequest.getAmount(), isAccepted);
    }
}