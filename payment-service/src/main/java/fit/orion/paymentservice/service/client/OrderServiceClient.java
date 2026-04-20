package fit.orion.paymentservice.service.client;

import fit.orion.paymentservice.dto.OrderDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OrderServiceClient {
    @Autowired
    private RestTemplate restTemplate;

    public OrderDTO getOrder(long orderId) {
        return restTemplate.getForObject("http://order-service/api/orders/" + orderId, OrderDTO.class);
    }

    public void updateOrderStatus(long orderId, String status) {
        String url = "http://order-service/api/orders/" + orderId;
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setStatus(status);
        restTemplate.put(url, orderDTO);
    }
}
