package com.uqam.api.mapper.implementation;

import com.uqam.api.dto.EvaluatorDTO;
import com.uqam.api.mapper.EvaluatorDTOMapper;
import com.uqam.api.model.entity.Evaluator;
import org.springframework.stereotype.Component;

@Component
public class EvaluatorDTOMapperImpl implements EvaluatorDTOMapper {
    @Override
    public EvaluatorDTO toEvaluatorDTO(Evaluator evaluator) {
        return new EvaluatorDTO(evaluator.getId(), evaluator.getFirstName(), evaluator.getLastName());
    }
}
