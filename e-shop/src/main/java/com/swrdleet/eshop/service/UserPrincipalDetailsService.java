package com.swrdleet.eshop.service;

import com.swrdleet.eshop.model.User;
import com.swrdleet.eshop.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * User Details service.
 */
@Service
public class UserPrincipalDetailsService implements UserDetailsService {

    /**
     * User service. Used to get current user.
     */
    @Autowired
    private UserService userService;

    /**
     * @param username The given user's username.
     * @return User by username.
     * @throws UsernameNotFoundException Failed to load user.
     */
    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userService.getUserByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username");
        }
        return new UserPrincipal(user);
    }
}
