package com.swrdleet.eshop.repository;

import com.swrdleet.eshop.model.BasketProduct;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * {@link BasketProduct} Repository.
 */
@Repository
public interface BasketProductRepository extends CrudRepository<BasketProduct, Long> {
    /**
     * @param userId owner.
     * @return List of {@link BasketProduct}'s.
     */
    List<BasketProduct> findAllByUserId(Long userId);

    /**
     * @param userId basket owner.
     * @param productId product from basket.
     * @return Current basket.
     */
    BasketProduct findByUserIdAndProductId(Long userId, Long productId);
}
