package fit.orion.paymentservice.service;

import fit.orion.paymentservice.dto.OrderDTO;
import fit.orion.paymentservice.model.Payment;
import fit.orion.paymentservice.repository.PaymentRepository;
import fit.orion.paymentservice.service.client.OrderServiceClient;
import jakarta.persistence.criteria.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository repo;

    @Autowired
    private OrderServiceClient orderServiceClient;

    @Transactional(readOnly = true)
    public List<Payment> getAll() {
        return repo.findAll();
    }

    @Transactional
    public Payment save(Payment payment) {
        OrderDTO order = orderServiceClient.getOrder(payment.getOrderId());
        if (order == null) {
            throw new IllegalArgumentException("Order not found");
        }
        Payment savedPayment = repo.save(payment);
        orderServiceClient.updateOrderStatus(savedPayment.getOrderId(), "PAID");
        return savedPayment;
    }
}
