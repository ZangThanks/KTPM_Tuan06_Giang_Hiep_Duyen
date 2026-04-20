package fit.orion.orderservice.service;

import fit.orion.orderservice.model.OrderDetail;
import fit.orion.orderservice.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderDetailService {
    @Autowired
    private OrderDetailRepository repo;

    @Transactional(readOnly = true)
    public List<OrderDetail> getAll() {
        return repo.findAll();
    }

    @Transactional
    public OrderDetail save(OrderDetail orderDetail) {
        return repo.save(orderDetail);
    }
}
