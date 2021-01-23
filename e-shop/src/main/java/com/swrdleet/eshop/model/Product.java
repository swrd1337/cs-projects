package com.swrdleet.eshop.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Product object entity.
 */
@Data
@NoArgsConstructor
@Entity(name = "products")
public class Product {

    /**
     * Primary ID for given product.
     */
    @Id
    @Column(name = "productId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * Product name.
     */
    private String name;

    /**
     * Product description.
     */
    @Column(name = "description", length = 1024)
    private String description;

    /**
     * Product price.
     */
    private Double price;

    /**
     * Product category
     */
    @OneToOne
    @JoinColumn(name = "categoryId", referencedColumnName = "categoryId")
    private Category category;

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
     * @param category Product category.
     * @param imageUrl Image url.
     */
    public Product(String name, String description, Double price, Category category, String imageUrl) {
        setName(name);
        setDescription(description);
        setPrice(price);
        setCategory(category);
        setImageUrl(imageUrl);
    }
}
