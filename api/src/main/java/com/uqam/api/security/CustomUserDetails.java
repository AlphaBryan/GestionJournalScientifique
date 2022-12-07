package com.uqam.api.security;

import com.uqam.api.model.entity.Administrator;
import com.uqam.api.model.entity.Author;
import com.uqam.api.model.entity.Evaluator;
import com.uqam.api.model.entity.Person;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetailsWithRole {
    private final Role role;
    private final String email;
    private final String password;
    private final Person person;

    public CustomUserDetails(Role role, String email, String password, Person person) {
        this.role = role;
        this.email = email;
        this.password = password;
        this.person = person;
    }

    @Override
    public Role getRole() {
        return role;
    }

    @Override
    public boolean isAdministrator() {
        return role == Role.ADMINISTRATOR;
    }

    @Override
    public boolean isAuthor() {
        return role == Role.AUTHOR;
    }

    @Override
    public boolean isEvaluator() {
        return role == Role.EVALUATOR;
    }

    @Override
    public Administrator getAdministrator() {
        return (Administrator) person;
    }

    @Override
    public Author getAuthor() {
        return (Author) person;
    }

    @Override
    public Evaluator getEvaluator() {
        return (Evaluator) person;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        switch (role) {
            case ADMINISTRATOR -> authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            case EVALUATOR -> authorities.add(new SimpleGrantedAuthority("ROLE_EVALUATOR"));
            case AUTHOR -> authorities.add(new SimpleGrantedAuthority("ROLE_AUTHOR"));
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
