package com.swrdleet.eshop.controller;

import com.swrdleet.eshop.dto.CategoryDTO;
import com.swrdleet.eshop.model.Category;
import com.swrdleet.eshop.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * {@link Category} controller.
 */
@RestController
public class CategoryController {

    /**
     * {@link Category} service.
     */
    @Autowired
    private CategoryService categoryService;

    /**
     * Save new category to DB.
     *
     * @param categoryInfo Store category information.
     */
    @PostMapping("/admin/api/category")
    public void addCategory(@RequestBody CategoryDTO categoryInfo) {
        categoryService.addCategory(categoryInfo);
    }

    /**
     * Remove category by given Id.
     * @param id category id
     */
    @DeleteMapping("/admin/api/category")
    public void deleteCategory(@RequestParam("id") Long id) {
        categoryService.deleteCategory(id);
    }

    /**
     * @param id category Id.
     * @return CategoryDTO with given Id.
     */
    public CategoryDTO getCategory(@RequestParam("id") Long id) {
        return categoryService.getCategory(id);
    }

    /**
     * Get all categories from DB.
     *
     * @return List of categories.
     */
    @GetMapping("/public/api/categories")
    public List<Category> getCategories() {
        return categoryService.getCategories();
    }

}
