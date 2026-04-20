package fit.orion.orderservice.service.client;

import fit.orion.orderservice.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserServiceClient {
    @Autowired
    private RestTemplate restTemplate;

    public UserDTO getUser(long id) {
        return restTemplate.getForObject("lb://user-service/api/users/" + id, UserDTO.class);
    }

    public UserDTO getUserByUsername(String name) {
        return restTemplate.getForObject("lb://user-service/api/users/username?username=" + name, UserDTO.class);
    }
}
