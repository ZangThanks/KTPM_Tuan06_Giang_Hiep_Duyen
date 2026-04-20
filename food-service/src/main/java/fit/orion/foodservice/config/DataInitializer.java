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

        Food food = new Food("Milk", 20, 5000, "https://dairynutrition.ca/sites/dairynutrition/files/styles/full_width_large/public/shutterstock_4305538_1182x788px_0.jpg?itok=iXDEsfsk");
        repo.save(food);

        Food food1 = new Food( "Oil", 50, 6000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuZpNS34WJFUyg6QVxjYbCav6QqsR_XgAdpQ&s");
        repo.save(food1);

        Food food2 = new Food( "Candy", 5, 10000, "https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_lfill,w_300,dpr_3/https://assets.app.engoo.com/images/nunH3EXTOMQ3qF40h0QIzDcLNfQK80arXNIP0mIv0df.jpeg");
        repo.save(food2);

        Food food3 = new Food( "Pencil", 10, 200, "https://www.foodandwine.com/thmb/oQxMr-wP2YjxLZ63kRmGnlDy4ZI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Bun-bo-Hue-Vietnamese-Vermicelli-Noodle-Soup-with-Sliced-Beef-XL-RECIPE0423-47194f9a6efb4695ac72c76798f6aa64.jpg");
        repo.save(food3);

        System.out.println("Initialized data successfully!");
    }
}
