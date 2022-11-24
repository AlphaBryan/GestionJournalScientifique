package com.uqam.api.mapper;

import com.uqam.api.dto.VersionDTO;
import com.uqam.api.model.entity.Version;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VersionDTOMapper {

    VersionDTO toVersionDTO(Version version);
}
