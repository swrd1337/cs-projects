package com.swrdleet.eshop.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {

    private String nickname;

    private String email;

    private String password;

    private String role;

    private String avatarUrl;

    public UserDTO(String nickname, String email, String password, String role, String avatarUrl) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.avatarUrl = avatarUrl;
    }
}
