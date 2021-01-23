package com.swrdleet.eshop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Site controller. Serve static content like <i>index.html</i>.
 */
@Controller
public class SiteController {

    /**
     * Redirect to <code>index.html</code> page.
     *
     * @return Page to be redirected.
     */
    @GetMapping("/")
    public String index() {
        return "index";
    }

    /**
     * Redirect to <code>login.html</code> page.
     *
     * @return Page to be redirected.
     */
    @GetMapping("/login")
    public String login() {
        return "login";
    }

}
