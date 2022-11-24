package com.uqam.api.model.dao;

import com.uqam.api.model.entity.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO extends CrudRepository<UserEntity, Integer> {

    @Query(value = "SELECT u FROM UserEntity u WHERE u.email = ?1")
    UserEntity findUserByEmail(String email);

}
