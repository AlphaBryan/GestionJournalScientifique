package com.uqam.api.mapper.implementation;

import com.uqam.api.dto.AuthorDTO;
import com.uqam.api.mapper.AuthorDTOMapper;
import com.uqam.api.model.entity.Author;
import org.springframework.stereotype.Component;

@Component
public class AuthorDTOMapperImpl implements AuthorDTOMapper {
    @Override
    public AuthorDTO toAuthorDTO(Author author) {

        return new AuthorDTO(author.getId(), author.getFirstName(), author.getLastName());

    }
}
