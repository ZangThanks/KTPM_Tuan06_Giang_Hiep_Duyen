package fit.orion.foodservice.controller;

import fit.orion.foodservice.model.Food;
import fit.orion.foodservice.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {
    @Autowired
    private FoodService service;

    @GetMapping("")
    public List<Food> getFoods() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Food getFood(@PathVariable int id) {
        return service.getById(id);
    }

    @PostMapping("")
    public Food addFood(@RequestBody Food food) {
        return service.save(food);
    }

    @PutMapping("/{id}")
    public Food updateFood(@RequestBody Food food, @PathVariable int id) {
        return service.save(food);
    }

    @DeleteMapping("/{id}")
    public boolean deleteFood(@PathVariable long id) {
        return service.delete(id);
    }
}
