package com.uqam.api.model.dao;

import com.uqam.api.model.entity.Author;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorDAO extends CrudRepository<Author, Integer> {

    Optional<Author> findByEmail(String email);

}
