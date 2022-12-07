package com.uqam.api.security;

import com.uqam.api.model.entity.Administrator;
import com.uqam.api.model.entity.Author;
import com.uqam.api.model.entity.Evaluator;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserDetailsWithRole extends UserDetails {

    Role getRole();

    boolean isAdministrator();

    boolean isAuthor();

    boolean isEvaluator();

    Administrator getAdministrator();

    Author getAuthor();

    Evaluator getEvaluator();
}
