package fit.orion.orderservice.service;

import fit.orion.orderservice.dto.FoodDTO;
import fit.orion.orderservice.dto.UserDTO;
import fit.orion.orderservice.model.Order;
import fit.orion.orderservice.model.OrderDetail;
import fit.orion.orderservice.repository.OrderRepository;
import fit.orion.orderservice.service.client.FoodServiceClient;
import fit.orion.orderservice.service.client.UserServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository repo;

    @Autowired
    private OrderDetailService detailService;

    @Autowired
    private UserServiceClient userService;

    @Autowired
    private FoodServiceClient foodService;

    @Transactional(readOnly = true)
    public List<Order> getAll() {
        return repo.findAll();
    }

    @Transactional
    public Order save(Order order) throws Exception {
        UserDTO user = userService.getUser(order.getUserId());
        if(user == null) {
            throw new Exception("User not found!");
        }

        List<OrderDetail> orderDetails = order.getOrderDetails();
        for (OrderDetail orderDetail : orderDetails) {
            FoodDTO food = foodService.getFoodById(orderDetail.getFoodId());
            if (food == null) {
                throw new Exception("Food not found!");
            }
            orderDetail.setPrice(food.getPrice());
        }

        order.setStatus("PENDING");
        order.setOrderDate(LocalDate.now());

        order.setOrderDetails(null);

        Order savedOrder = repo.save(order);
        for (OrderDetail orderDetail : orderDetails) {
            orderDetail.setOrder(savedOrder);
            detailService.save(orderDetail);
        }

        savedOrder.setOrderDetails(orderDetails);
        return repo.save(order);
    }

    @Transactional(readOnly = true)
    public Order getById(long id) {
        return repo.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    public List<Order> getByUserId(long userId) {
        if (userService.getUser(userId) == null) {
            return null;
        }
        return repo.getOrdersByUserId(userId);
    }

    @Transactional
    public Order update(long id, Order order) {
        if (getById(id) == null) return null;

        order.setId(id);
        return repo.save(order);
    }
}
