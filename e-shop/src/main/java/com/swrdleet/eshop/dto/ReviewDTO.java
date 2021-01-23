package com.swrdleet.eshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Review wrapper.
 */
@Data
@AllArgsConstructor
public class ReviewDTO {

    /**
     * The given Product Id.
     */
    private Long productId;

    /**
     * Review content.
     */
    private String content;

    /**
     * User Avatar URL.
     */
    private String avatarUrl;

    /**
     * User Nickname.
     */
    private String userNickname;
}
