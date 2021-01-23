package com.swrdleet.eshop.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Products in user's basket.
 */
@Entity
@Data
@NoArgsConstructor
public class BasketProduct {

    /**
     * ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * basket owner Id.
     */
    private Long userId;

    /**
     * Given product Id.
     */
    private Long productId;

    /**
     * Constructor.
     * @param userId owner
     * @param productId added product.
     */
    public BasketProduct(Long userId, Long productId) {
        this.userId = userId;
        this.productId = productId;
    }

}
