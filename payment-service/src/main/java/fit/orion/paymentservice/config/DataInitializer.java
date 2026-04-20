package fit.orion.paymentservice.config;

import fit.orion.paymentservice.model.Payment;
import fit.orion.paymentservice.repository.PaymentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {
    private final PaymentRepository repo;

    public DataInitializer(PaymentRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repo.count() > 0) {
            return;
        }

        Payment payment = new Payment(1, 1, "CARD", LocalDateTime.now());
        repo.save(payment);

        Payment payment2 = new Payment(2, 2, "CREDIT", LocalDateTime.now());
        repo.save(payment2);

        System.out.println("Initialized data successfully!");
    }
}
