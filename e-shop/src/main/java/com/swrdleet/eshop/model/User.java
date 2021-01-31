package com.swrdleet.eshop.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity(name = "users")
public class User implements Serializable {

    private static final long serialVersionUID = 1337L;

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
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.avatarUrl = avatarUrl;
    }

}
