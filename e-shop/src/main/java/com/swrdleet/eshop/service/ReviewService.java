package com.swrdleet.eshop.service;

import com.swrdleet.eshop.dto.ReviewDTO;
import com.swrdleet.eshop.model.Product;
import com.swrdleet.eshop.model.Review;
import com.swrdleet.eshop.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Product's reviews service.
 */
@Service
public class ReviewService {

    /**
     * Review repository.
     */
    @Autowired
    private ReviewRepository reviewRepository;

    /**
     * Product service.
     */
    @Autowired
    private ProductService productService;

    /**
     * @param productId The given product Id.
     * @return All reviews of the specific product.
     */
    public List<ReviewDTO> getProductReviews(Long productId) {
        List<Review> allReviews = reviewRepository.findAllByProductId(productId);

        return allReviews.stream().map(review -> {
            Long id = review.getProduct().getId();
            String content = review.getContent();
            String avatarUrl = review.getAvatarUrl();
            String userNickname = review.getUserNickname();
            return new ReviewDTO(id, content, avatarUrl, userNickname);
        }).collect(Collectors.toList());
    }

    /**
     * Save review.
     * @param reviewInfo The given review wrapper.
     */
    public void addReview(ReviewDTO reviewInfo) {
        Long productId = reviewInfo.getProductId();
        Product product = productService.getProduct(productId);
        String content = reviewInfo.getContent();
        String avatarUrl = reviewInfo.getAvatarUrl();
        String userNickname = reviewInfo.getUserNickname();
        Review review = new Review(product, content, avatarUrl, userNickname);
        reviewRepository.save(review);
    }
}
