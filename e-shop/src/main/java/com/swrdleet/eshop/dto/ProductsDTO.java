package com.swrdleet.eshop.dto;

import com.swrdleet.eshop.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

/**
 * Page of Products wrapper.
 */
@Data
@AllArgsConstructor
public class ProductsDTO {

    /**
     * Total nr of Products in DB.
     */
    private long totalElements;

    /**
     * Total nr of pages.
     */
    private int totalPages;

    /**
     * Current page of Products.
     */
    private List<Product> products;

}
