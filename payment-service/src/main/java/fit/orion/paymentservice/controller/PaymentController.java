package fit.orion.paymentservice.controller;

import fit.orion.paymentservice.model.Payment;
import fit.orion.paymentservice.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    private PaymentService service;

    @GetMapping("/test")
    public String test() {
        return "Success";
    }

    @GetMapping("")
    public List<Payment> getAll() {
        return service.getAll();
    }

    @PostMapping("")
    public Payment save(@RequestBody Payment payment, Principal principal) {
        return service.save(payment, principal.getName());
    }

    @GetMapping("/order/{orderId}")
    public List<Payment> findByOrderId(@PathVariable long orderId) {
        return service.findByOrderId(orderId);
    }
}
