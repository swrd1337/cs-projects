package com.swrdleet.eshop.repository;

import com.swrdleet.eshop.model.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Category repository. Allow to apply CRUD operation on <code>categories</code> table.
 */
public interface CategoryRepository extends CrudRepository<Category, Long> {

    /**
     * Find all categories.
     *
     * @return List of categories.
     */
    List<Category> findAll();

}
