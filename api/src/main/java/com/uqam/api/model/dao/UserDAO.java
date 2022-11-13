package com.uqam.api.model.dao;

import com.uqam.api.model.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserDAO extends CrudRepository<UserEntity, Integer> {
}
