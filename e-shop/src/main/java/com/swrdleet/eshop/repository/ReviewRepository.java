package com.swrdleet.eshop.repository;

import com.swrdleet.eshop.model.Review;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * Reviews repository. Allow to use CRUD operations and pagination on <code>reviews</code> table.
 */
public interface ReviewRepository extends PagingAndSortingRepository<Review, Long> {

    /**
     * @param productId The given product Id.
     * @return All reviews of specific product.
     */
    List<Review> findAllByProductId(Long productId);
}
