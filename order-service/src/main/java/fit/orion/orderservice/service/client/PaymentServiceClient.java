package fit.orion.orderservice.service.client;

import fit.orion.orderservice.dto.PaymentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentServiceClient {
    @Autowired
    private RestTemplate restTemplate;

    public List<PaymentDTO> getPaymentByOrderId(long orderId) {
        ResponseEntity<List<PaymentDTO>> response = restTemplate.exchange(
                "lb://payment-service/api/payments/order/" + orderId, HttpMethod.GET, null
                , new ParameterizedTypeReference<>() {}
        );
        return response.getBody() != null ? response.getBody() : new ArrayList<>();
    }
}
