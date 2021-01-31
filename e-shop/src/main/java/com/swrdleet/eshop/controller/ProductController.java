package com.swrdleet.eshop.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swrdleet.eshop.dto.ProductDTO;
import com.swrdleet.eshop.dto.ProductsDTO;
import com.swrdleet.eshop.model.Product;
import com.swrdleet.eshop.service.ProductService;
import net.bytebuddy.utility.RandomString;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Products end point.
 * <code>/public/api/**</code> All users end points.
 * <code>/api/**</code> End points for admins and moderators.
 */
@RestController
public class ProductController {

    /**
     * Products repository.
     */
    @Autowired
    private ProductService productService;

    /**
     * Get page of {@link Product}s as {@link ProductsDTO}.
     *
     * @param page Page to be returned.
     * @param size Size of page to be returned.
     * @return Products page as {@link ProductsDTO}.
     */
    @GetMapping("/public/api/products")
    public ProductsDTO getProducts(@RequestParam("page") int page, @RequestParam("size") int size) {
        return productService.getProducts(page, size);
    }

    /**
     * Get page of {@link Product}s as {@link ProductsDTO}.
     *
     * @param page Page to be returned.
     * @param size Size of page to be returned.
     * @param categoryId the given category.
     * @return Products page.
     */
    @GetMapping("/public/api/category/products")
    public List<Product> getProductsByCategory(
            @RequestParam("page") int page,
            @RequestParam("size") int size,
            @RequestParam("categoryId") Long categoryId
    ) {

        return productService.getProducts(page, size, categoryId);
    }

    /**
     * Get latest {@link Product}s.
     *
     * @return List of {@link Product}s.
     */
    @GetMapping("/public/api/products/asc")
    public List<Product> getLatestProducts(@RequestParam("page") int page, @RequestParam("size") int size) {
        return productService.getProductsAsc(page, size);
    }

    /**
     * Get {@link Product} by ID.
     *
     * @return Product by given ID.
     */
    @GetMapping("/public/api/product/{id}")
    public Product getProduct(@PathVariable("id") Long id) {
        return productService.getProduct(id);
    }

    /**
     * Delete product by given Id.
     * @param id product Id.
     */
    @DeleteMapping("/admin/api/product")
    public void deleteProduct(@RequestParam("id") Long id) {
        productService.deleteProduct(id);
    }

    /**
     * Add product to basket.
     * @param productId given product Id.
     * @param userId current user Id.
     */
    @PostMapping("/auth/api/basket/product")
    public void addProductToBasket(@RequestParam("productId") Long productId, @RequestParam("userId") Long userId) {
        productService.addProductToBasket(productId, userId);
    }

    /**
     * @param userId basket owner Id.
     * @return List of {@link Product}'s from basket.
     */
    @GetMapping("/auth/api/basket/products")
    public List<Product> getAllFromBasket(@RequestParam("userId") Long userId) {
        return productService.getAllFromBasket(userId);
    }

    /**
     * @param userId basket owner Id.
     * @return Total price of {@link Product}'s from basket.
     */
    @GetMapping("/auth/api/basket/price")
    public Map<String, Integer> getBasketPrice(@RequestParam("userId") Long userId) {
        List<Product> allFromBasket = productService.getAllFromBasket(userId);

        int totalPrice = 0;
        for (Product p : allFromBasket) {
            totalPrice += p.getPrice();
        }

        Map<String, Integer> result = new HashMap<>();
        result.put("totalPrice", totalPrice);

        return result;
    }


    /**
     * Add new  {@link Product} to repository.
     *
     * @param productInfo {@link ProductDTO} Information about new {@link Product}.
     * @throws IOException invalid conversion.
     */
    @PostMapping("/admin/api/product")
    public void addProduct(
            @RequestParam("productInfo") String productInfo,
            @RequestParam("image") MultipartFile img) throws IOException {
        String filename = saveImage(img);

        ProductDTO productDTO = new ObjectMapper().readValue(productInfo, ProductDTO.class);
        productDTO.setImageUrl(filename);

        productService.addProduct(productDTO);
    }

    /**
     * Delete form basket.
     * @param productId The given product.
     * @param userId basket owner Id.
     */
    @DeleteMapping("/auth/api/basket/product")
    public void deleteProductFromBasket(@RequestParam("productId") Long productId, @RequestParam("userId") Long userId) {
        productService.deleteProductFromBasket(productId, userId);
    }

    /**
     * Save image to server storage.
     * @param img Image file.
     * @return String url of the given image.
     * @throws IOException Saving failed.
     */
    private String saveImage(@RequestParam("image") MultipartFile img) throws IOException {
        Path path = Paths.get("products");
        if (!Files.exists(path)) {
            Files.createDirectory(path);
        }

        String randomString = RandomString.make(10);
        String sessionId = RequestContextHolder.currentRequestAttributes().getSessionId();
        String hex = DigestUtils.sha256Hex(sessionId);
        String originalFilename = img.getOriginalFilename();
        if (originalFilename != null) {
            String extension = originalFilename.split("\\.")[1];
            String filename = "products/" + randomString + hex + "." + extension;
            File upl = new File(filename);
            boolean fileCreated = upl.createNewFile();
            if (fileCreated) {
                try(FileOutputStream os = new FileOutputStream(upl)) {
                    os.write(img.getBytes());
                }
            }
            return filename;
        }
        throw new IOException("Cannot save image!");
    }

}
