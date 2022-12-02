package com.uqam.api.security;

import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;

public class CustomUserDetails implements UserDetailsWithRole {
    private final Role role;
    private final String email;
    private final String password;

    public CustomUserDetails(Role role, String email, String password) {
        this.role = role;
        this.email = email;
        this.password = password;
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
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<>();
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
