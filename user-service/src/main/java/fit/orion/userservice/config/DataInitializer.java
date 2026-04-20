package fit.orion.userservice.config;

import fit.orion.userservice.model.User;
import fit.orion.userservice.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final UserRepository repo;

    public DataInitializer(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repo.count() > 0) {
            return;
        }

        User user = new User(1, "admin", "admin", "admin@123", "ADMIN");
        repo.save(user);

        User user1 = new User(2, "Huynh Thanh Giang", "zangthanks", "zang@123", "USER");
        repo.save(user1);

        User user2 = new User(3, "Phan Phuoc Hiep", "hiepphan", "hiphip@123", "USER");
        repo.save(user2);

        User user3 = new User(4, "Nguyen Thi My Duyen", "mduyen", "mduyen@123", "USER");
        repo.save(user3);

        System.out.println("Initialized data successfully!");
    }
}
