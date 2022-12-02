package com.uqam.api.behaviour.authentication;

import com.uqam.api.dto.EvaluatorDTO;
import com.uqam.api.mapper.EvaluatorDTOMapper;
import com.uqam.api.model.dao.EvaluatorDAO;
import com.uqam.api.model.entity.Evaluator;
import com.uqam.api.security.JwtTokenUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping(path = "auth/evaluator")
public class AuthEvaluatorController {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final EvaluatorDAO evaluatorDAO;
    private final EvaluatorDTOMapper evaluatorDTOMapper;

    public AuthEvaluatorController(PasswordEncoder passwordEncoder, JwtTokenUtil jwtTokenUtil, EvaluatorDAO evaluatorDAO, EvaluatorDTOMapper evaluatorDTOMapper) {
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenUtil = jwtTokenUtil;
        this.evaluatorDAO = evaluatorDAO;
        this.evaluatorDTOMapper = evaluatorDTOMapper;
    }

    @PostMapping("login")
    public ResponseEntity<EvaluatorDTO> loginEvaluator(@RequestBody @Valid LoginRequest request) {
        
        Optional<Evaluator> evaluator = evaluatorDAO.findByEmail(request.getEmail());
        if (evaluator.isEmpty() || !passwordEncoder.matches(request.getPassword(), evaluator.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity
                .ok()
                .header(HttpHeaders.AUTHORIZATION, jwtTokenUtil.generateToken(evaluator.get().toUserDetails()))
                .body(evaluatorDTOMapper.toEvaluatorDTO(evaluator.get()));
    }
}
