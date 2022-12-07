package com.uqam.api.behaviour.evaluator;

import com.uqam.api.dto.EvaluatorDTO;
import com.uqam.api.mapper.EvaluatorDTOMapper;
import com.uqam.api.model.entity.Evaluator;
import com.uqam.api.service.EvaluatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("evaluators")
public class EvaluatorController {

    private final EvaluatorService evaluatorService;
    private final EvaluatorDTOMapper evaluatorDTOMapper;


    public EvaluatorController(EvaluatorService evaluatorService, EvaluatorDTOMapper evaluatorDTOMapper) {
        this.evaluatorService = evaluatorService;
        this.evaluatorDTOMapper = evaluatorDTOMapper;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/")
    public ResponseEntity<List<EvaluatorDTO>> getEvaluators() {
        Iterable<Evaluator> evaluators = evaluatorService.getAll();

        List<EvaluatorDTO> evaluatorDTOS = new ArrayList<>();
        for (Evaluator evaluator : evaluators) {
            evaluatorDTOS.add(evaluatorDTOMapper.toEvaluatorDTO(evaluator));
        }

        return ResponseEntity.ok().body(evaluatorDTOS);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/")
    public ResponseEntity<EvaluatorDTO> createEvaluator(@RequestBody @Valid CreateEvaluatorRequest request) {
        Evaluator evaluator = evaluatorService.create(request.getFirstName(), request.getLastName(), request.getEmail(), request.getPassword());

        return ResponseEntity.ok().body(evaluatorDTOMapper.toEvaluatorDTO(evaluator));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{evaluatorId}")
    public ResponseEntity<Object> removeEvaluator(@PathVariable("evaluatorId") Integer evaluatorId) {
        Evaluator evaluator = evaluatorService.delete(evaluatorId);
        if (evaluator == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok().build();
    }
}
