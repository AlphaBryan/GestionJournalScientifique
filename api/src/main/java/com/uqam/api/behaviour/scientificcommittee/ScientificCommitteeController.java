package com.uqam.api.behaviour.scientificcommittee;

import com.uqam.api.dto.CommitteeDTO;
import com.uqam.api.mapper.CommitteeDTOMapper;
import com.uqam.api.model.entity.ScientificCommittee;
import com.uqam.api.service.ArticleService;
import com.uqam.api.service.ScientificCommitteeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("committees")
public class ScientificCommitteeController {

    private final ScientificCommitteeService scientificCommitteeService;
    private final ArticleService articleService;

    private final CommitteeDTOMapper committeeDTOMapper;


    public ScientificCommitteeController(ScientificCommitteeService scientificCommitteeService, ArticleService articleService, CommitteeDTOMapper committeeDTOMapper) {
        this.scientificCommitteeService = scientificCommitteeService;
        this.articleService = articleService;
        this.committeeDTOMapper = committeeDTOMapper;
    }

    @GetMapping("/{committeeId}")
    public ResponseEntity<CommitteeDTO> getCommittee(@PathVariable("committeeId") Integer committeeId) {
        Optional<ScientificCommittee> scientificCommittee = scientificCommitteeService.getById(committeeId);
        if (scientificCommittee.isEmpty()) return ResponseEntity.notFound().build();

        return ResponseEntity
                .ok()
                .body(committeeDTOMapper.toCommitteeDTO(scientificCommittee.get()));
    }

    @GetMapping("/")
    public ResponseEntity<List<CommitteeDTO>> getCommittees() {
        Iterable<ScientificCommittee> scientificCommittees = scientificCommitteeService.getAll();

        List<CommitteeDTO> committees = new ArrayList<>();
        for (ScientificCommittee scientificCommittee : scientificCommittees) {
            committees.add(committeeDTOMapper.toCommitteeDTO(scientificCommittee));
        }

        return ResponseEntity.ok().body(committees);
    }

    @PostMapping("/")
    public ResponseEntity<CommitteeDTO> createCommittee(@RequestBody @Valid CreateCommitteeRequest request) {
        ScientificCommittee scientificCommittee = scientificCommitteeService.create(request.getEvaluatorsId());
        if (scientificCommittee == null) return ResponseEntity.badRequest().build();

        return new ResponseEntity<>(committeeDTOMapper.toCommitteeDTO(scientificCommittee), HttpStatus.CREATED);
    }

    @PutMapping("/{committeeId}")
    public ResponseEntity<CommitteeDTO> updateCommittee(@PathVariable("committeeId") Integer committeeId, @RequestBody @Valid UpdateCommitteeRequest request) {
        ScientificCommittee scientificCommittee = scientificCommitteeService.update(committeeId, request.getEvaluatorsId());
        if (scientificCommittee == null) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok().body(committeeDTOMapper.toCommitteeDTO(scientificCommittee));
    }

    @PutMapping("/{committeeId}/articles")
    public ResponseEntity<CommitteeDTO> affectArticleToCommittee(@PathVariable("committeeId") Integer committeeId, @RequestBody @Valid AffectArticleToCommitteeRequest request) {
        ScientificCommittee scientificCommittee = articleService.affectToScientificCommittee(request.getArticleId(), committeeId);
        if (scientificCommittee == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok().body(committeeDTOMapper.toCommitteeDTO(scientificCommittee));
    }

}
