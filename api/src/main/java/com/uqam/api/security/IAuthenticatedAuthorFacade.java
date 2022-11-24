package com.uqam.api.security;

import com.uqam.api.model.entity.Author;

public interface IAuthenticatedAuthorFacade {

    Author getAuthenticatedAuthor();
}
