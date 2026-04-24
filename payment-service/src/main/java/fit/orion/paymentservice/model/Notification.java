package fit.orion.paymentservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    private long id;
    private String username;
    private long orderId;
    private String message;
    private LocalDateTime createdAt;
}
