package fit.orion.foodservice.service;

import fit.orion.foodservice.model.Food;
import fit.orion.foodservice.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FoodService {
    @Autowired
    private FoodRepository repo;

    @Transactional(readOnly = true)
    public List<Food> getAll() {
        return repo.findAll();
    }

    @Transactional
    public Food save(Food food) {
        return repo.save(food);
    }

    @Transactional(readOnly = true)
    public Food getById(long id) {
        return repo.findById(id).orElse(null);
    }

    @Transactional
    public boolean delete(long id) {
        repo.deleteById(id);
        return getById(id) == null;
    }

    @Transactional
    public Food update(long id, Food food) {
        if (getById(id) == null) return null;

        food.setId(id);
        return repo.save(food);
    }
}
