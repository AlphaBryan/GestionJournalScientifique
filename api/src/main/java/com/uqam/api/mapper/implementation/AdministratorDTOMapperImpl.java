package com.uqam.api.mapper.implementation;

import com.uqam.api.dto.AdministratorDTO;
import com.uqam.api.mapper.AdministratorDTOMapper;
import com.uqam.api.model.entity.Administrator;
import org.springframework.stereotype.Component;

@Component
public class AdministratorDTOMapperImpl implements AdministratorDTOMapper {
    @Override
    public AdministratorDTO toAdministratorDTO(Administrator administrator) {
        return new AdministratorDTO(administrator.getId(), administrator.getFirstName(), administrator.getLastName());
    }
}
