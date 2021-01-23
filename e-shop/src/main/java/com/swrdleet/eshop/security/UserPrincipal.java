package com.swrdleet.eshop.security;

import com.swrdleet.eshop.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * User Principal. Used for security feature.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPrincipal implements UserDetails {

    /**
     * User model.
     */
    private User user;

    /**
     * @return Logged user authorities.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();

        String userRole = user.getRole();
        GrantedAuthority authority = new SimpleGrantedAuthority(userRole);
        authorities.add(authority);

        return authorities;
    }

    /**
     * @return User password.
     */
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    /**
     * @return User username.
     */
    @Override
    public String getUsername() {
        return user.getEmail();
    }

    /**
     * Dummy.
     * @return
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Dummy.
     * @return
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Dummy.
     * @return
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Dummy.
     * @return
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
