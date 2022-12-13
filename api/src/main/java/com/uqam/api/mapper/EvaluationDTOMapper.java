package com.uqam.api.mapper;

import com.uqam.api.dto.EvaluationDTO;
import com.uqam.api.model.entity.Evaluation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EvaluationDTOMapper {

    EvaluationDTO toEvaluationDTO(Evaluation evaluation);
}
