package com.swrdleet.eshop.repository;

import com.swrdleet.eshop.model.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Users repository. Allow to use CRUD operations on <code>users</code> table.
 */
public interface UserRepository extends CrudRepository<User, Long> {
    User findByEmail(String email);
}
