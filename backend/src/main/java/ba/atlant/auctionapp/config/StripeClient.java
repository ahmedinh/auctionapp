package ba.atlant.auctionapp.config;

import ba.atlant.auctionapp.model.Product;
import ba.atlant.auctionapp.repository.ProductRepository;
import com.stripe.Stripe;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Component
public class StripeClient {
    @Value("${stripe.api.secretKey}")
    private String secretKey;

    @Autowired
    private ProductRepository productRepository;

    @PostConstruct
    public void  initSecretKey(){
        Stripe.apiKey = secretKey;
    }

    public Customer createCustomer(String token, String email) throws Exception {
        Map<String, Object> customerParams = new HashMap<String, Object>();
        customerParams.put("email", email);
        customerParams.put("source", token);
        return Customer.create(customerParams);
    }

    private Customer getCustomer(String id) throws Exception {
        return Customer.retrieve(id);
    }

    @Transactional
    public Charge chargeNewCard(String token, double amount, Long productId) throws Exception {
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "USD");
        chargeParams.put("source", token);
        Charge charge = Charge.create(chargeParams);
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product with provided ID is not found."));
        product.setPaid(true);
        productRepository.save(product);
        return charge;
    }

    public Charge chargeCustomerCard(String customerId, int amount) throws Exception {
        String sourceCard = getCustomer(customerId).getDefaultSource();
        Map<String, Object> chargeParams = new HashMap<String, Object>();
        chargeParams.put("amount", amount);
        chargeParams.put("currency", "USD");
        chargeParams.put("customer", customerId);
        chargeParams.put("source", sourceCard);
        Charge charge = Charge.create(chargeParams);
        return charge;
    }
}