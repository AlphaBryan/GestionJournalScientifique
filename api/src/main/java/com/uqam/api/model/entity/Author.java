package com.uqam.api.model.entity;

import com.uqam.api.security.CustomUserDetails;
import com.uqam.api.security.Role;
import com.uqam.api.security.UserDetailsWithRole;

import javax.persistence.*;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Author extends Person {

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "authors")
    private List<Article> articles;


    protected Author() {
        super();
    }

    public Author(String firstName, String lastName, String email, String password) {
        super(firstName, lastName, email, password);
    }

    public List<Article> getArticles() {
        return articles;
    }

    public UserDetailsWithRole toUserDetails() {
        return new CustomUserDetails(Role.AUTHOR, email, password, this);
    }
}

