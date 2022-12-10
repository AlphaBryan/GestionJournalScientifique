package com.uqam.api.model.seed;

import com.uqam.api.model.dao.ArticleDAO;
import com.uqam.api.model.dao.AuthorDAO;
import com.uqam.api.model.entity.Article;
import com.uqam.api.model.entity.Author;
import com.uqam.api.model.entity.Category;
import com.uqam.api.model.entity.Version;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class SeedArticle implements CommandLineRunner {
    private final ArticleDAO articleDAO;
    private final PasswordEncoder passwordEncoder;

    public SeedArticle(ArticleDAO articleDAO, PasswordEncoder passwordEncoder) {
        this.articleDAO = articleDAO;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedArticle();
    }

    private void seedArticle() {
        if (articleDAO.count() == 0) {

        }
    }

}

