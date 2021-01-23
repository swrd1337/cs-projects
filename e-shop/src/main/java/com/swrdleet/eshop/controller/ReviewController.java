package com.swrdleet.eshop.controller;

import com.swrdleet.eshop.dto.ReviewDTO;
import com.swrdleet.eshop.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Reviews end point.
 */
@RestController
public class ReviewController {

    /**
     * Review service.
     */
    @Autowired
    private ReviewService reviewService;

    /**
     * @param productId The given product Id.
     * @return All reviews on specific product.
     */
    @GetMapping("/public/api/reviews")
    public List<ReviewDTO> getProductReviews(@RequestParam("productId") Long productId) {
        return reviewService.getProductReviews(productId);
    }

    /**
     * Add review into DB.
     * @param reviewInfo Review details.
     */
    @PostMapping("/auth/api/review")
    public void addReview(@RequestBody ReviewDTO reviewInfo) {
        reviewService.addReview(reviewInfo);
    }

}
