package com.uqam.api.model.seed;

import com.uqam.api.model.dao.AdministratorDAO;
import com.uqam.api.model.dao.AuthorDAO;
import com.uqam.api.model.entity.Administrator;
import com.uqam.api.model.entity.Author;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class SeedAuthor implements CommandLineRunner {
    private final AuthorDAO authorDAO;
    private final PasswordEncoder passwordEncoder;

    public SeedAuthor(AuthorDAO authorDAO, PasswordEncoder passwordEncoder) {
        this.authorDAO = authorDAO;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedAuthor();
    }

    private void seedAuthor() {
        if (authorDAO.count() == 0) {
            authorDAO.save(new Author("Admin", "Admin", "admin@admin.ca", passwordEncoder.encode("secret")));
        }
    }

}
