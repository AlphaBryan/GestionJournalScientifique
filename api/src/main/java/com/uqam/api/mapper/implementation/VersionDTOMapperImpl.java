package com.uqam.api.mapper.implementation;

import com.uqam.api.dto.EvaluationDTO;
import com.uqam.api.dto.VersionDTO;
import com.uqam.api.mapper.EvaluationDTOMapper;
import com.uqam.api.mapper.VersionDTOMapper;
import com.uqam.api.model.entity.Evaluation;
import com.uqam.api.model.entity.Version;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class VersionDTOMapperImpl implements VersionDTOMapper {

    private final EvaluationDTOMapper evaluationDTOMapper;

    public VersionDTOMapperImpl(EvaluationDTOMapper evaluationDTOMapper) {
        this.evaluationDTOMapper = evaluationDTOMapper;
    }

    @Override
    public VersionDTO toVersionDTO(Version version) {
        List<EvaluationDTO> evaluationDTOS = new ArrayList<>();
        for (Evaluation evaluation : version.getEvaluations()) {
            evaluationDTOS.add(evaluationDTOMapper.toEvaluationDTO(evaluation));
        }
        return new VersionDTO(version.getId(), version.getText(), version.getCreationDate(), evaluationDTOS);
    }
}
