package com.swrdleet.eshop.service;

import com.swrdleet.eshop.dto.ProductDTO;
import com.swrdleet.eshop.dto.ProductsDTO;
import com.swrdleet.eshop.model.BasketProduct;
import com.swrdleet.eshop.model.Category;
import com.swrdleet.eshop.model.Product;
import com.swrdleet.eshop.model.Review;
import com.swrdleet.eshop.repository.BasketProductRepository;
import com.swrdleet.eshop.repository.CategoryRepository;
import com.swrdleet.eshop.repository.ProductRepository;
import com.swrdleet.eshop.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Products Service.
 */
@Service
public class ProductService {

    /**
     * {@link Product} repository.
     */
    @Autowired
    private ProductRepository productRepository;

    /**
     * {@link Category} repository.
     */
    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * Review repository.
     */
    @Autowired
    private ReviewRepository reviewRepository;

    /**
     * {@link BasketProductRepository} repository.
     */
    @Autowired
    private BasketProductRepository basketProductRepository;

    /**
     * Get page of products as {@link ProductDTO}.
     *
     * @param page Current page.
     * @param size Size of current page.
     * @return ProductDTO that contains page of products.
     */
    public ProductsDTO getProducts(int page, int size) {
        Pageable pageRequest = PageRequest.of(page, size);
        Page<Product> productsPage = productRepository.findAll(pageRequest);
        List<Product> productList = productsPage.getContent();
        long totalElements = productsPage.getTotalElements();
        int totalPages = productsPage.getTotalPages();

        return new ProductsDTO(totalElements, totalPages, productList);
    }

    /**
     * Get page of product as list in ascendent order.
     *
     * @param page Current page.
     * @param size Size of current page.
     * @return List of {@link Product}s.
     */
    public List<Product> getProductsAsc(int page, int size) {
        Pageable pageRequest = PageRequest.of(page, size);
        Page<Product> productsPage = productRepository.findAllByOrderByIdDesc(pageRequest);
        return productsPage.getContent();
    }

    /**
     * Add new {@link Product} to DB.
     *
     * @param productInfo Store basic information about new {@link Product}.
     */
    public void addProduct(ProductDTO productInfo) {
        String name = productInfo.getName();
        String description = productInfo.getDescription();
        double price = productInfo.getPrice();
        long categoryId = productInfo.getCategoryId();
        String imageUrl = productInfo.getImageUrl();

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Invalid Category"));

        Product newProduct = new Product(name, description, price, category, imageUrl);
        productRepository.save(newProduct);
    }

    /**
     * Get {@link Product} by given ID.
     *
     * @param id current product ID.
     * @return Product
     */
    public Product getProduct(Long id) {
        return productRepository.findById(id).orElseThrow();
    }

    /**
     * Delete product by given Id.
     * @param id product Id.
     */
    public void deleteProduct(Long id) {
        List<Review> reviews = reviewRepository.findAllByProductId(id);
        if (!reviews.isEmpty()) {
            reviewRepository.deleteAll(reviews);
        }

        Product product = getProduct(id);
        productRepository.delete(product);
    }

    /**
     * Get page of {@link Product}s as {@link ProductsDTO}.
     *
     * @param page Page to be returned.
     * @param size Size of page to be returned.
     * @param categoryId the given category.
     * @return Products
     */
    public List<Product> getProducts(int page, int size, Long categoryId) {
        Pageable pageRequest = PageRequest.of(page, size);
        Page<Product> productsPage = productRepository.findAllByCategoryId(pageRequest, categoryId);
        return productsPage.getContent();
    }

    /**
     * Add product to basket.
     * @param productId given product Id.
     * @param userId current user Id.
     */
    public void addProductToBasket(Long productId, Long userId) {
        BasketProduct basketProduct = new BasketProduct(userId, productId);
        basketProductRepository.save(basketProduct);
    }

    /**
     * @param userId basket owner Id.
     * @return List of {@link Product}'s from basket.
     */
    public List<Product> getAllFromBasket(Long userId) {
        List<BasketProduct> allByUserId = basketProductRepository.findAllByUserId(userId);
        List<Long> list = allByUserId.stream().map(a -> a.getProductId()).collect(Collectors.toList());
        Iterable<Product> products = productRepository.findAllById(list);
        List<Product> result = new ArrayList<>();
        products.forEach(result::add);
        return result;
    }

    /**
     * Delete form basket.
     * @param productId The given product.
     * @param userId basket owner.
     */
    public void deleteProductFromBasket(Long productId, Long userId) {
        BasketProduct basketProduct = basketProductRepository.findByUserIdAndProductId(userId, productId);
        basketProductRepository.delete(basketProduct);
    }
}
