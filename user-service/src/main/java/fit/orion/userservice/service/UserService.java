package fit.orion.userservice.service;

import fit.orion.userservice.model.User;
import fit.orion.userservice.repository.UserRepository;
import fit.orion.userservice.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    @Transactional(readOnly = true)
    public User getUserById(long id) {
        return repo.findById(id).orElse(null);
    }

    @Transactional
    public User save(User user) {
        return repo.save(user);
    }

    @Transactional(readOnly = true)
    public User getUserByUsername(String username) {
        return repo.getUserByUsername(username);
    }

    public String generateToken(String username) {
        return jwtUtil.generateJwtToken(username);
    }

    @Transactional
    public User saveWithEncryptedPassword(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repo.save(user);
    }

    @Transactional(readOnly = true)
    public boolean isValidUser(String username, String password) {
        var user = repo.getUserByUsername(username);
        if (user == null) {
            return false;
        }
        return passwordEncoder.matches(password, user.getPassword());
    }
}
