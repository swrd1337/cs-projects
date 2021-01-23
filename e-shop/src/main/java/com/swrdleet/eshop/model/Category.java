package com.swrdleet.eshop.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Category model.
 */
@Data
@NoArgsConstructor
@Entity(name = "categories")
public class Category {

    /**
     * The category element Id.
     */
    @Id
    @Column(name = "categoryId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * The category element name.
     */
    private String name;

    /**
     * Constructor.
     * @param name Category name.
     */
    public Category(String name) {
        this.name = name;
    }
}
