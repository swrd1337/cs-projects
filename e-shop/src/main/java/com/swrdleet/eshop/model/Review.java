package com.swrdleet.eshop.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import javax.persistence.*;

/**
 * Review model that represent user's thoughts about give product.
 */
@Data
@NoArgsConstructor
@Entity(name = "reviews")
public class Review {

    /**
     * The Review element id.
     */
    @Id
    @Column(name = "reviewId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * Referenced product.
     */
    @ManyToOne
    @JoinColumn(name = "productId", referencedColumnName = "productId")
    private Product product;

    /**
     * Review content.
     */
    @NonNull
    private String content;

    /**
     * User Avatar URL.
     */
    private String avatarUrl;

    /**
     * User Nickname.
     */
    private String userNickname;

    /**
     * Constructor.
     * @param product Referenced product.
     * @param content Review content.
     */
    public Review(Product product, String content, String avatarUrl, String userNickname) {
        setProduct(product);
        setContent(content);
        setAvatarUrl(avatarUrl);
        setUserNickname(userNickname);
    }

}
