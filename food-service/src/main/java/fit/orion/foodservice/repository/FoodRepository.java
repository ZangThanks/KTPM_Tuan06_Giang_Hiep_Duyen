package fit.orion.foodservice.repository;

import fit.orion.foodservice.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {

}
