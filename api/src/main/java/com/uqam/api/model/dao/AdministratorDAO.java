package com.uqam.api.model.dao;

import com.uqam.api.model.entity.Administrator;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorDAO extends CrudRepository<Administrator, Integer> {

    Optional<Administrator> findByEmail(String email);
}
