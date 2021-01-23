package com.swrdleet.eshop.controller;

import com.swrdleet.eshop.dto.UserDTO;
import com.swrdleet.eshop.dto.UserResultDTO;
import com.swrdleet.eshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * Users end point.
 */
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/public/api/user")
    public void addUser(@RequestBody UserDTO userInfo) {
        userService.addUser(userInfo);
    }

    @GetMapping("/auth/api/user/me")
    public UserResultDTO getMe(Principal principal) {
        return userService.getMe(principal);
    }
}
