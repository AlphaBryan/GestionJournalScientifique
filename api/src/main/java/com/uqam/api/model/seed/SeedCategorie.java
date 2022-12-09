package com.uqam.api.model.seed;

import com.uqam.api.model.dao.AuthorDAO;
import com.uqam.api.model.dao.CategoryDAO;
import com.uqam.api.model.entity.Author;
import com.uqam.api.model.entity.Category;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class SeedCategorie implements CommandLineRunner {
    private final CategoryDAO categoryDAO;


    public SeedCategorie(CategoryDAO categoryDAO) {
        this.categoryDAO = categoryDAO;

    }

    @Override
    public void run(String... args) throws Exception {
        seedCategorie();
    }

    private void seedCategorie() {
        if (categoryDAO.count() == 0) {
            categoryDAO.save(new Category(1, "Machine Learning"));
        }
    }

}
