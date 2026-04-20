package fit.orion.paymentservice.dto;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    @Id
    private long id;

    private long userId;

    private double totalAmount;

    private LocalDate orderDate;

    private String status;
}
