package com.uqam.api.mapper.implementation;

import com.uqam.api.dto.UserDTO;
import com.uqam.api.mapper.UserDTOMapper;
import com.uqam.api.model.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserDTOMapperImpl implements UserDTOMapper {
    @Override
    public UserDTO toUserDTO(UserEntity userEntity) {
        if (userEntity == null) return null;

        UserDTO userDTO = new UserDTO();
        userDTO.setId(userEntity.getId().toString());
        userDTO.setEmail(userEntity.getEmail());

        return userDTO;
    }
}
