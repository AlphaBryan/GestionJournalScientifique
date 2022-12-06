package com.uqam.api.behaviour.evaluator;

import com.uqam.api.dto.EvaluatorDTO;
import com.uqam.api.mapper.EvaluatorDTOMapper;
import com.uqam.api.model.dao.EvaluatorDAO;
import com.uqam.api.model.entity.Evaluator;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("evaluators")
public class EvaluatorController {

    private final EvaluatorDAO evaluatorDAO;
    private final EvaluatorDTOMapper evaluatorDTOMapper;
    private final PasswordEncoder passwordEncoder;

    public EvaluatorController(EvaluatorDAO evaluatorDAO, EvaluatorDTOMapper evaluatorDTOMapper, PasswordEncoder passwordEncoder) {
        this.evaluatorDAO = evaluatorDAO;
        this.evaluatorDTOMapper = evaluatorDTOMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/")
    public ResponseEntity<List<EvaluatorDTO>> getEvaluators() {
        Iterable<Evaluator> evaluators = evaluatorDAO.findAll();

        List<EvaluatorDTO> evaluatorDTOS = new ArrayList<>();
        for (Evaluator evaluator : evaluators) {
            evaluatorDTOS.add(evaluatorDTOMapper.toEvaluatorDTO(evaluator));
        }

        return ResponseEntity.ok().body(evaluatorDTOS);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EvaluatorDTO> createEvaluator(@RequestBody @Valid CreateEvaluatorRequest request) {
        System.out.println("Create evaluator");
        Evaluator evaluator = evaluatorDAO.save(new Evaluator(request.getFirstName(), request.getLastName(), request.getEmail(), passwordEncoder.encode(request.getPassword())));
        System.out.println("Evaluator created");
        return ResponseEntity.ok().body(evaluatorDTOMapper.toEvaluatorDTO(evaluator));
    }

    @DeleteMapping("/{evaluatorId}")
    public ResponseEntity<Object> removeEvaluator(@PathVariable("evaluatorId") Integer evaluatorId) {
        Optional<Evaluator> evaluator = evaluatorDAO.findById(evaluatorId);
        if (evaluator.isEmpty()) return ResponseEntity.badRequest().build();

        evaluatorDAO.delete(evaluator.get());

        return ResponseEntity.ok().build();
    }
}
