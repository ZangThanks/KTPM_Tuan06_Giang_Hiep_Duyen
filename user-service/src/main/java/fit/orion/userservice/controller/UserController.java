package fit.orion.userservice.controller;

import fit.orion.userservice.dto.LoginRequest;
import fit.orion.userservice.dto.LoginResponse;
import fit.orion.userservice.model.User;
import fit.orion.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User savedUser = service.saveWithEncryptedPassword(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new LoginResponse(null, user.getId(), user.getUsername(), "Registration failed: " + e.getMessage())
            );
        }
    }

//    @PostMapping("/login")
//    public boolean isValidUser(@RequestParam String username,@RequestParam String password) {
//        return service.isValidUser(username, password);
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = service.getUserByUsername(request.getUsername());
        if (user == null || !service.isValidUser(request.getUsername(), request.getPassword())) {
            return ResponseEntity.badRequest().body(
              new LoginResponse(null, 0, request.getUsername(), "Invalid username or password")
            );
        }
        String token = service.generateToken(user.getUsername());
        return ResponseEntity.ok(
                new LoginResponse(token, user.getId(), user.getUsername(), "Login successful")
        );
    }

    @GetMapping("")
    public List<User> getAll() {
        return service.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable long id) {
        return service.getUserById(id);
    }

    @GetMapping("/username")
    public User getByUsername(@RequestParam String username) {
        return service.getUserByUsername(username);
    }
}
