package com.uqam.api.mapper.implementation;

import com.uqam.api.dto.VersionDTO;
import com.uqam.api.mapper.VersionDTOMapper;
import com.uqam.api.model.entity.Version;
import org.springframework.stereotype.Component;

@Component
public class VersionDTOMapperImpl implements VersionDTOMapper {
    @Override
    public VersionDTO toVersionDTO(Version version) {
        return new VersionDTO(version.getId(), version.getText());
    }
}
