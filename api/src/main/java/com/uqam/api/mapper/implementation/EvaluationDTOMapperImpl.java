package com.uqam.api.mapper.implementation;

import com.uqam.api.dto.EvaluationDTO;
import com.uqam.api.mapper.EvaluationDTOMapper;
import com.uqam.api.model.entity.Evaluation;
import org.springframework.stereotype.Component;

@Component
public class EvaluationDTOMapperImpl implements EvaluationDTOMapper {
    @Override
    public EvaluationDTO toEvaluationDTO(Evaluation evaluation) {
        return new EvaluationDTO(evaluation.getId(), evaluation.getRate(), evaluation.getComment(), evaluation.isCommentMajor());
    }
}
