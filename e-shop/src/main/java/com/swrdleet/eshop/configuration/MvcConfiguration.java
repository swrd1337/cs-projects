package com.swrdleet.eshop.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * MVC Configuration.
 */
@Configuration
public class MvcConfiguration implements WebMvcConfigurer {

    /**
     * Add custom folder from file-system products images.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/products/**").addResourceLocations("file:products/");
    }
}
