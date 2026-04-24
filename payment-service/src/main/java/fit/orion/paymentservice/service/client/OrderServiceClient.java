package fit.orion.paymentservice.service.client;

import fit.orion.paymentservice.dto.OrderDTO;
import fit.orion.paymentservice.dto.OrderStatusRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OrderServiceClient {
    @Autowired
    private RestTemplate restTemplate;

    public OrderDTO getOrder(long orderId) {
        return restTemplate.getForObject("lb://order-service/api/orders/" + orderId, OrderDTO.class);
    }

    public void updateOrderStatus(long orderId, String status) {
        String url = "lb://order-service/api/orders/" + orderId + "/status";
        restTemplate.put(url, new OrderStatusRequest(status));
    }
}
