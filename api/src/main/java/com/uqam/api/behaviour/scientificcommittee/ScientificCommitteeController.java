package com.uqam.api.behaviour.scientificcommittee;

import com.uqam.api.dto.CommitteeDTO;
import com.uqam.api.mapper.CommitteeDTOMapper;
import com.uqam.api.model.dao.ArticleDAO;
import com.uqam.api.model.dao.EvaluatorDAO;
import com.uqam.api.model.dao.ScientificCommitteeDAO;
import com.uqam.api.model.entity.Article;
import com.uqam.api.model.entity.Evaluator;
import com.uqam.api.model.entity.Phase;
import com.uqam.api.model.entity.ScientificCommittee;
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

    private final ScientificCommitteeDAO scientificCommitteeDAO;
    private final EvaluatorDAO evaluatorDAO;
    private final ArticleDAO articleDAO;
    private final CommitteeDTOMapper committeeDTOMapper;


    public ScientificCommitteeController(ScientificCommitteeDAO scientificCommitteeDAO, EvaluatorDAO evaluatorDAO, ArticleDAO articleDAO, CommitteeDTOMapper committeeDTOMapper) {
        this.scientificCommitteeDAO = scientificCommitteeDAO;
        this.evaluatorDAO = evaluatorDAO;
        this.articleDAO = articleDAO;
        this.committeeDTOMapper = committeeDTOMapper;
    }

    @GetMapping("/{committeeId}")
    public ResponseEntity<CommitteeDTO> getCommittee(@PathVariable("committeeId") Integer committeeId) {
        Optional<ScientificCommittee> scientificCommittee = scientificCommitteeDAO.findById(committeeId);
        if (scientificCommittee.isEmpty()) return ResponseEntity.badRequest().build();

        return ResponseEntity
                .ok()
                .body(committeeDTOMapper.toCommitteeDTO(scientificCommittee.get()));
    }

    @GetMapping("/")
    public ResponseEntity<List<CommitteeDTO>> getCommittees() {
        Iterable<ScientificCommittee> scientificCommittees = scientificCommitteeDAO.findAll();

        List<CommitteeDTO> committees = new ArrayList<>();
        for (ScientificCommittee scientificCommittee : scientificCommittees) {
            committees.add(committeeDTOMapper.toCommitteeDTO(scientificCommittee));
        }

        return ResponseEntity.ok().body(committees);
    }

    @PostMapping("/")
    public ResponseEntity<CommitteeDTO> createCommittee(@RequestBody @Valid CreateCommitteeRequest request) {
        List<Evaluator> evaluators = new ArrayList<>();
        System.out.println(request.getEvaluatorsId());
        for (Integer evaluatorId : request.getEvaluatorsId()) {
            Optional<Evaluator> evaluator = evaluatorDAO.findById(evaluatorId);
            if (evaluator.isEmpty()) return ResponseEntity.badRequest().build();
            evaluators.add(evaluator.get());
        }
        System.out.println(evaluators);
        ScientificCommittee scientificCommittee = scientificCommitteeDAO.save(new ScientificCommittee(evaluators));

        return new ResponseEntity<>(committeeDTOMapper.toCommitteeDTO(scientificCommittee), HttpStatus.CREATED);
    }

    @PutMapping("/{committeeId}")
    public ResponseEntity<CommitteeDTO> updateCommittee(@PathVariable("committeeId") Integer committeeId, @RequestBody @Valid UpdateCommitteeRequest request) {
        Optional<ScientificCommittee> scientificCommitteeRes = scientificCommitteeDAO.findById(committeeId);
        if (scientificCommitteeRes.isEmpty()) return ResponseEntity.badRequest().build();

        ScientificCommittee scientificCommittee = scientificCommitteeRes.get();
        List<Evaluator> evaluators = new ArrayList<>();
        for (Integer evaluatorId : request.getEvaluatorsId()) {
            Optional<Evaluator> evaluator = evaluatorDAO.findById(evaluatorId);
            if (evaluator.isEmpty()) return ResponseEntity.badRequest().build();
            evaluators.add(evaluator.get());
        }
        scientificCommittee.setEvaluators(evaluators);
        scientificCommittee = scientificCommitteeDAO.save(scientificCommittee);

        return ResponseEntity.ok().body(committeeDTOMapper.toCommitteeDTO(scientificCommittee));
    }

    @PutMapping("/{committeeId}/articles")
    public ResponseEntity<CommitteeDTO> affectArticleToCommittee(@PathVariable("committeeId") Integer committeeId, @RequestBody @Valid AffectArticleToCommitteeRequest request) {
        Optional<ScientificCommittee> scientificCommitteeRes = scientificCommitteeDAO.findById(committeeId);
        if (scientificCommitteeRes.isEmpty()) return ResponseEntity.badRequest().build();

        Optional<Article> article = articleDAO.findById(request.getArticleId());
        if (article.isEmpty()) return ResponseEntity.badRequest().build();
        if (article.get().getPhase() != Phase.CREATED) return ResponseEntity.badRequest().build();

        article.get().setScientificCommittee(scientificCommitteeRes.get());
        articleDAO.save(article.get());

        return ResponseEntity.ok().body(committeeDTOMapper.toCommitteeDTO(scientificCommitteeRes.get()));
    }

}
