package com.uqam.api.model.seed;

import com.uqam.api.model.dao.AdministratorDAO;
import com.uqam.api.model.entity.Administrator;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class SeedAdmin implements CommandLineRunner {
    private final AdministratorDAO administratorDAO;
    private final PasswordEncoder passwordEncoder;

    public SeedAdmin(AdministratorDAO administratorDAO, PasswordEncoder passwordEncoder) {
        this.administratorDAO = administratorDAO;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        seedAdmin();
    }

    private void seedAdmin() {
        if (administratorDAO.count() == 0) {
            administratorDAO.save(new Administrator("Admin", "Admin", "admin@admin.ca", passwordEncoder.encode("secret")));
        }
    }
}
