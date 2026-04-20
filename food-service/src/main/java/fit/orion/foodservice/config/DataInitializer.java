package fit.orion.foodservice.config;

import fit.orion.foodservice.model.Food;
import fit.orion.foodservice.repository.FoodRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final FoodRepository repo;

    public DataInitializer(FoodRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repo.count() > 0) {
            return;
        }

        Food food = new Food(1, "Milk", 20, 5000);
        repo.save(food);

        Food food1 = new Food(2, "Oil", 50, 6000);
        repo.save(food1);

        Food food2 = new Food(3, "Candy", 5, 10000);
        repo.save(food2);

        Food food3 = new Food(4, "Pencil", 10, 200);
        repo.save(food3);

        System.out.println("Initialized data successfully!");
    }
}
