package com.uqam.api.mapper;

import com.uqam.api.dto.CommitteeDTO;
import com.uqam.api.model.entity.ScientificCommittee;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommitteeDTOMapper {

    CommitteeDTO toCommitteeDTO(ScientificCommittee scientificCommittee);

}
