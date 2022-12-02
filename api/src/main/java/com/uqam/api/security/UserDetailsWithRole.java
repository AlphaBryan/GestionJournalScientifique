package com.uqam.api.security;

import org.springframework.security.core.userdetails.UserDetails;

public interface UserDetailsWithRole extends UserDetails {

    Role getRole();

    boolean isAdministrator();

    boolean isAuthor();

    boolean isEvaluator();
}
