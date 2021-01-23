package com.swrdleet.eshop.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity(name = "users")
public class User {

    @Id
    @Column(name = "userId")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nickname;

    @NonNull
    private String email;

    @NonNull
    private String password;

    private String role;

    private String avatarUrl;

    public User(String nickname, String email, String password, String role, String avatarUrl) {
        setNickname(nickname);
        setEmail(email);
        setPassword(password);
        setRole(role);
        setAvatarUrl(avatarUrl);
    }
}
