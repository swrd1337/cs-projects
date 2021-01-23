package com.swrdleet.eshop.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * {@link com.swrdleet.eshop.model.Product} object wrapper.
 */
@Data
@NoArgsConstructor
public class ProductDTO {

    /**
     * Product name.
     */
    private String name;

    /**
     * Product description.
     */
    private String description;

    /**
     * Product price.
     */
    private double price;

    /**
     * Product category ID.
     */
    private int categoryId;

    /**
     * Product image.
     */
    private String imageUrl;

    /**
     * Constructor.
     *
     * @param name Product name.
     * @param description Product description.
     * @param price Product price.
     * @param categoryId Product category ID.
     * @param imageUrl Image URL.
     */
    public ProductDTO(String name, String description, int price, int categoryId, String imageUrl) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.imageUrl = imageUrl;
    }
}
