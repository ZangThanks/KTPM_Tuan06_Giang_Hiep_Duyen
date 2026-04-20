package fit.orion.orderservice.controller;

import fit.orion.orderservice.dto.UserDTO;
import fit.orion.orderservice.model.Order;
import fit.orion.orderservice.service.OrderService;
import fit.orion.orderservice.service.client.UserServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService service;

    @Autowired
    private UserServiceClient userServiceClient;

    @GetMapping("")
    public List<Order> getOrders() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable int id) {
        return service.getById(id);
    }

    @PostMapping("")
    public Order saveOrder(@RequestBody Order order) throws Exception {
        return service.save(order);
    }

    @GetMapping("/users/{id}")
    public List<Order> getUserOrders(@PathVariable int id) {
        return service.getByUserId(id);
    }

    @PutMapping("/{id}")
    public Order updateOrder(@RequestBody Order order, @PathVariable int id) {
        return service.update(id, order);
    }

    @GetMapping("/me")
    public List<Order> getMyOrders(Principal principal) {
        String username = principal.getName();
        UserDTO user = userServiceClient.getUserByUsername(username);
        if (user == null) {
            return new ArrayList<>();
        }
        return service.getByUserId(user.getId());
    }
}
