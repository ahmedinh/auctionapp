package ba.atlant.auctionapp.controller;

import ba.atlant.auctionapp.config.StripeClient;
import com.stripe.model.Charge;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/payment")
public class PaymentIntentController {

    private StripeClient stripeClient;
    @Autowired
    PaymentIntentController(StripeClient stripeClient) {
        this.stripeClient = stripeClient;
    }
    @PostMapping("/charge")
    @Operation(summary = "Product payment using Stripe", security = @SecurityRequirement(name = "bearerAuth"))
    public Charge chargeCard(@RequestHeader(value="token") String token,
                             @RequestHeader(value="amount") Double amount,
                             @RequestParam(value = "productId") Long productId) throws Exception {
        return this.stripeClient.chargeNewCard(token, amount, productId);
    }
}