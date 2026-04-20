package fit.orion.orderservice.config;

import fit.orion.orderservice.model.Order;
import fit.orion.orderservice.model.OrderDetail;
import fit.orion.orderservice.repository.OrderDetailRepository;
import fit.orion.orderservice.repository.OrderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;

@Component
public class DataInitializer implements CommandLineRunner {
    private final OrderRepository repo;
    private final OrderDetailRepository detailRepo;

    public DataInitializer(OrderRepository repo, OrderDetailRepository detailRepo) {
        this.repo = repo;
        this.detailRepo = detailRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repo.count() > 0) {
            return;
        }

        Order o1 = new Order(1, 2, 2000, LocalDate.now(), "PENDING", new ArrayList<>());
        OrderDetail od1 = new OrderDetail(o1, 1, 2, 5000, 10000);
        OrderDetail od2 = new OrderDetail(o1, 2, 1, 5000, 5000);
        OrderDetail od3 = new OrderDetail(o1, 3, 2, 5000, 10000);
        OrderDetail od4 = new OrderDetail(o1, 4, 4, 5000, 20000);

        o1.getOrderDetails().add(od1);
        o1.getOrderDetails().add(od2);
        o1.getOrderDetails().add(od3);
        o1.getOrderDetails().add(od4);
        repo.save(o1);

        Order o2 = new Order(2, 3, 2000, LocalDate.now(), "PAID", new ArrayList<>());
        OrderDetail od12 = new OrderDetail(o2, 1, 1, 5000, 5000);
        OrderDetail od22 = new OrderDetail(o2, 2, 2, 5000, 10000);
        OrderDetail od32 = new OrderDetail(o2, 3, 1, 5000, 5000);
        OrderDetail od42 = new OrderDetail(o2, 4, 2, 5000, 10000);

        o2.getOrderDetails().add(od12);
        o2.getOrderDetails().add(od22);
        o2.getOrderDetails().add(od32);
        o2.getOrderDetails().add(od42);
        repo.save(o2);

        System.out.println("Initialized data successfully!");
    }
}
