package fit.orion.paymentservice.controller;

import fit.orion.paymentservice.model.Notification;
import fit.orion.paymentservice.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/me")
    public List<Notification> getMyNotifications(Principal principal) {
        return notificationService.getNotifications(principal.getName());
    }
}
