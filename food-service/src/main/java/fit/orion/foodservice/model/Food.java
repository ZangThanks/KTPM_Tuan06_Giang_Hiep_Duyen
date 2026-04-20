package fit.orion.foodservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "foods")
public class Food {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    private int inStock;
    private String image;

    public Food(String name, int inStock, double price, String image ) {
        this.inStock = inStock;
        this.price = price;
        this.name = name;
        this.image = image;
    }
}
