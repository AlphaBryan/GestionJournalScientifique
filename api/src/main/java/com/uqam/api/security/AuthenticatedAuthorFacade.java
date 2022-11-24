package com.uqam.api.security;

import com.uqam.api.model.dao.AuthorDAO;
import com.uqam.api.model.entity.Author;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class AuthenticatedAuthorFacade implements IAuthenticatedAuthorFacade {

    private final AuthorDAO authorDAO;

    public AuthenticatedAuthorFacade(AuthorDAO authorDAO) {
        this.authorDAO = authorDAO;
    }

    @Override
    public Author getAuthenticatedAuthor() {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return authorDAO.findByEmail(user.getUsername()).get();
    }
}
