package com.swrdleet.eshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * {@link com.swrdleet.eshop.model.Category} model wrapper.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

    /**
     * Category name.
     */
    private String name;

}
