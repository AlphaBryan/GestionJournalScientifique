package com.uqam.api.mapper;

import com.uqam.api.dto.EditionDTO;
import com.uqam.api.model.entity.Edition;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EditionDTOMapper {
    EditionDTO toEditionDTO(Edition edition);
}
