package com.uqam.api.service;

import com.uqam.api.model.dao.AuthorDAO;
import com.uqam.api.model.entity.Author;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuthorService {

    private final AuthorDAO authorDAO;

    public AuthorService(AuthorDAO authorDAO) {
        this.authorDAO = authorDAO;
    }

    public Optional<Author> getById(Integer authorId) {
        return authorDAO.findById(authorId);
    }

    public Iterable<Author> getAll() {
        return authorDAO.findAll();
    }

}
