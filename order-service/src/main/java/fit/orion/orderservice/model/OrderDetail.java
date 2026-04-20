package fit.orion.orderservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@IdClass(OrderDetail.OrderDetailId.class)
@Table(name = "order_details")
public class OrderDetail {
    @Id
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Id
    private long foodId;

    private int quantity;

    private double price;

    private double lineTotal;

    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderDetailId {
        private Order order;
        private long foodId;
    }
}
