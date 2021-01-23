package com.swrdleet.eshop.service;

import com.swrdleet.eshop.dto.CategoryDTO;
import com.swrdleet.eshop.model.Category;
import com.swrdleet.eshop.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * {@link Category} service. Connecting to repository.
 */
@Service
public class CategoryService {

    /**
     * {@link Category} repository.
     */
    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * Save new {@link Category} object.
     * @param categoryInfo Store category information.
     */
    public void addCategory(CategoryDTO categoryInfo) {
        Category category = new Category(categoryInfo.getName());
        categoryRepository.save(category);
    }

    /**
     * Get all categories from server.
     *
     * @return List of Categories.
     */
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    /**
     * Remove category by given Id.
     * @param id category id
     */
    public void deleteCategory(Long id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        Category category = optionalCategory.orElseThrow();
        categoryRepository.delete(category);
    }

    /**
     * @param id category Id.
     * @return CategoryDTO with given Id.
     */
    public CategoryDTO getCategory(Long id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        Category category = optionalCategory.orElseThrow();
        return new CategoryDTO(category.getName());
    }
}
