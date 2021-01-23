package com.swrdleet.eshop.repository;

import com.swrdleet.eshop.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Products repository. Allow to use CRUD operations on <code>products</code> table.
 * Also allow to user pagination on Products data.
 */
public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {

    /**
     * Get page of {@link Product}s in ascendent order, used to get last 10 rows from table.
     *
     * @param pageable Pagination information.
     * @return Page of {@link Product} elements.
     */
    Page<Product> findAllByOrderByIdDesc(Pageable pageable);

    /**
     * Get page of {@link Product}s in ascendent order, used to get last 10 rows from table.
     *
     * @param pageable Pagination information.
     * @param categoryId The given category Id.
     * @return Page of {@link Product} elements.
     */
    Page<Product> findAllByCategoryId(Pageable pageable, Long categoryId);

}
