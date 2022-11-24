package com.uqam.api.behaviour.scientificcommittee;

import com.uqam.api.dto.CommitteeDTO;
import com.uqam.api.mapper.CommitteeDTOMapper;
import com.uqam.api.model.dao.ScientificCommitteeDAO;
import com.uqam.api.model.entity.ScientificCommittee;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("committees")
public class ScientificCommitteeController {

    private final ScientificCommitteeDAO scientificCommitteeDAO;
    private final CommitteeDTOMapper committeeDTOMapper;

    public ScientificCommitteeController(ScientificCommitteeDAO scientificCommitteeDAO, CommitteeDTOMapper committeeDTOMapper) {
        this.scientificCommitteeDAO = scientificCommitteeDAO;
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
}
