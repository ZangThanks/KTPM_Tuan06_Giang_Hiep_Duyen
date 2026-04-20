package fit.orion.orderservice.service.client;

import fit.orion.orderservice.dto.FoodDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FoodServiceClient {
    @Autowired
    private RestTemplate template;

    public FoodDTO getFoodById(long id) {
        return template.getForObject("lb://food-service/api/foods/" + id, FoodDTO.class);
    }

    public FoodDTO updateFoodStock(long id, int qty) {
        FoodDTO foodDTO = getFoodById(id);
        if (foodDTO == null) return null;
        foodDTO.setId(foodDTO.getId() - qty);

        template.put("lb://food-service/api/foods/" + id, foodDTO);
        return foodDTO;
    }
}
