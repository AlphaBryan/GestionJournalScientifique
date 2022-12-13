package com.uqam.api.mapper.implementation;

import com.uqam.api.dto.EditionDTO;
import com.uqam.api.mapper.EditionDTOMapper;
import com.uqam.api.model.entity.Edition;
import org.springframework.stereotype.Component;

@Component
public class EditionDTOMapperImpl implements EditionDTOMapper {
    @Override
    public EditionDTO toEditionDTO(Edition edition) {
        return new EditionDTO(edition.getId(), edition.getName(), edition.getSubmissionLimitDate(), edition.getPhase());
    }
}
