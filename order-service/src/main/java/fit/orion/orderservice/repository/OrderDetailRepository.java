package fit.orion.orderservice.repository;

import fit.orion.orderservice.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, OrderDetail.OrderDetailId> {

}
