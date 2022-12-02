package com.uqam.api.behaviour.edition;

import com.uqam.api.dto.EditionDTO;
import com.uqam.api.mapper.EditionDTOMapper;
import com.uqam.api.model.dao.EditionDAO;
import com.uqam.api.model.entity.Edition;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("editions")
public class EditionController {

    private final EditionDAO editionDAO;
    private final EditionDTOMapper editionDTOMapper;

    public EditionController(EditionDAO editionDAO, EditionDTOMapper editionDTOMapper) {
        this.editionDAO = editionDAO;
        this.editionDTOMapper = editionDTOMapper;
    }

    @GetMapping("/")
    public ResponseEntity<List<EditionDTO>> getEditions() {
        Iterable<Edition> editions = editionDAO.findAll();

        List<EditionDTO> editionDTOS = new ArrayList<>();
        for (Edition edition : editions) {
            editionDTOS.add(editionDTOMapper.toEditionDTO(edition));
        }

        return ResponseEntity.ok().body(editionDTOS);
    }

    @PostMapping("/")
    public ResponseEntity<EditionDTO> createEdition(@RequestBody @Valid CreateEditionRequest request) {
        Edition edition = editionDAO.save(new Edition(request.getName(), request.getSubmissionLimitDate()));

        return ResponseEntity.ok().body(editionDTOMapper.toEditionDTO(edition));
    }

    @PutMapping("/{editionId}")
    public ResponseEntity<EditionDTO> updateEdition(@PathVariable("editionId") Integer editionId, @RequestBody @Valid UpdateEditionRequest request) {
        Optional<Edition> editionRes = editionDAO.findById(editionId);
        if (editionRes.isEmpty()) return ResponseEntity.badRequest().build();

        Edition edition = editionRes.get();
        edition.setName(request.getName());
        edition.setSubmissionLimitDate(request.getSubmissionLimitDate());
        edition = editionDAO.save(edition);

        return ResponseEntity.ok().body(editionDTOMapper.toEditionDTO(edition));
    }

}
