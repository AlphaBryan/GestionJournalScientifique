package com.uqam.api.model.entity;

import com.uqam.api.security.CustomUserDetails;
import com.uqam.api.security.Role;
import com.uqam.api.security.UserDetailsWithRole;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Author extends Person {

    protected Author() {
        super();
    }

    public Author(String firstName, String lastName, String email, String password) {
        super(firstName, lastName, email, password);
    }

    public UserDetailsWithRole toUserDetails() {
        return new CustomUserDetails(Role.AUTHOR, email, password);
    }
}

