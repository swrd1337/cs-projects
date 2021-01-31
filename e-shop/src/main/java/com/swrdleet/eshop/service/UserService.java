package com.swrdleet.eshop.service;

import com.swrdleet.eshop.dto.UserDTO;
import com.swrdleet.eshop.dto.UserResultDTO;
import com.swrdleet.eshop.model.User;
import com.swrdleet.eshop.repository.UserRepository;
import com.swrdleet.eshop.security.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

/**
 * Users Service.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void addUser(UserDTO userInfo) throws UserAlreadyExistsException {
        String email = userInfo.getEmail();
        User existingUser = userRepository.findByEmail(email);

        if (existingUser != null && existingUser.getEmail().equals(email)) {
            throw new UserAlreadyExistsException("User with this e-mail address already exists.");
        }

        String nickname = userInfo.getNickname();
        String password = new BCryptPasswordEncoder().encode(userInfo.getPassword());
        String role = userInfo.getRole();
        String avatarUrl = userInfo.getAvatarUrl();
        User user = new User(nickname, email, password, role, avatarUrl);
        userRepository.save(user);
    }

    public UserResultDTO getMe(Principal principal) {
        String principalName = principal.getName();
        User user = userRepository.findByEmail(principalName);
        Long id = user.getId();
        String nickname = user.getNickname();
        String email = user.getEmail();
        String role = user.getRole();
        String avatarUrl = user.getAvatarUrl();
        return new UserResultDTO(id, nickname, email, role, avatarUrl);
    }
}
