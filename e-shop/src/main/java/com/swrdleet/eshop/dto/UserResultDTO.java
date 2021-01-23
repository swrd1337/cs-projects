package com.swrdleet.eshop.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserResultDTO {

    private Long id;

    private String nickname;

    private String email;

    private String role;

    private String avatarUrl;

    public UserResultDTO(Long id, String nickname, String email, String role, String avatarUrl) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.role = role;
        this.avatarUrl = avatarUrl;
    }
}
