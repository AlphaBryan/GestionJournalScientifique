package com.uqam.api.mapper;

import com.uqam.api.dto.AuthorDTO;
import com.uqam.api.model.entity.Author;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthorDTOMapper {

    AuthorDTO toAuthorDTO(Author author);
}
