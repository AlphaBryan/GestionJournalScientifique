package com.uqam.api.mapper.implementation;

import com.uqam.api.dto.EvaluationDTO;
import com.uqam.api.dto.EvaluatorDTO;
import com.uqam.api.mapper.EvaluationDTOMapper;
import com.uqam.api.mapper.EvaluatorDTOMapper;
import com.uqam.api.model.entity.Evaluation;
import org.springframework.stereotype.Component;

@Component
public class EvaluationDTOMapperImpl implements EvaluationDTOMapper {

    private final EvaluatorDTOMapper evaluatorDTOMapper;

    public EvaluationDTOMapperImpl(EvaluatorDTOMapper evaluatorDTOMapper) {
        this.evaluatorDTOMapper = evaluatorDTOMapper;
    }

    @Override
    public EvaluationDTO toEvaluationDTO(Evaluation evaluation) {
        EvaluatorDTO evaluatorDTO = evaluatorDTOMapper.toEvaluatorDTO(evaluation.getEvaluator());
        return new EvaluationDTO(evaluation.getId(), evaluation.getRate(), evaluation.getComment(), evaluation.isCommentMajor(), evaluatorDTO);
    }
}
