package fit.orion.paymentservice.service;

import fit.orion.paymentservice.model.Notification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class NotificationService {
    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    private final Map<String, List<Notification>> store = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public Notification addNotification(String username, long orderId) {
        String message = "User " + username + " da dat don #" + orderId + " thanh cong";
        Notification notification = new Notification(
                idGenerator.getAndIncrement(),
                username,
                orderId,
                message,
                LocalDateTime.now()
        );
        store.computeIfAbsent(username, key -> Collections.synchronizedList(new ArrayList<>()))
                .add(notification);
        logger.info(message);
        return notification;
    }

    public List<Notification> getNotifications(String username) {
        List<Notification> notifications = store.get(username);
        if (notifications == null) {
            return Collections.emptyList();
        }
        return new ArrayList<>(notifications);
    }
}
