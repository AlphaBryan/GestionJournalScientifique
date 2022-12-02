package com.uqam.api.mapper;

import com.uqam.api.dto.UserDTO;
import com.uqam.api.model.entity.UserEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserDTOMapper {

    UserDTO toUserDTO(UserEntity userEntity);
}
