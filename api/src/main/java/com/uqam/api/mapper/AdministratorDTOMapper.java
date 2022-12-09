package com.uqam.api.mapper;

import com.uqam.api.dto.AdministratorDTO;
import com.uqam.api.model.entity.Administrator;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AdministratorDTOMapper {
    AdministratorDTO toAdministratorDTO(Administrator administrator);
}
