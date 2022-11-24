package com.uqam.api.mapper;

import com.uqam.api.dto.EvaluatorDTO;
import com.uqam.api.model.entity.Evaluator;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EvaluatorDTOMapper {

    EvaluatorDTO toEvaluatorDTO(Evaluator evaluator);

}
