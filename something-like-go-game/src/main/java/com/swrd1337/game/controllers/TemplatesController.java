package com.swrd1337.game.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Static HTML templates controller.
 */
@Controller
public class TemplatesController {

    /**
     * @return <code>index.html</code>
     */
    @GetMapping("/")
    public String index() {
        return "index";
    }

}
