package com.uqam.api.behaviour.edition;

import com.uqam.api.dto.EditionDTO;
import com.uqam.api.mapper.EditionDTOMapper;
import com.uqam.api.model.entity.Edition;
import com.uqam.api.service.EditionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("editions")
public class EditionController {

    private final EditionService editionService;
    private final EditionDTOMapper editionDTOMapper;

    public EditionController(EditionService editionService, EditionDTOMapper editionDTOMapper) {
        this.editionService = editionService;
        this.editionDTOMapper = editionDTOMapper;
    }

    @GetMapping("/")
    public ResponseEntity<List<EditionDTO>> getEditions() {
        Iterable<Edition> editions = editionService.getAll();

        List<EditionDTO> editionDTOS = new ArrayList<>();
        for (Edition edition : editions) {
            editionDTOS.add(editionDTOMapper.toEditionDTO(edition));
        }

        return ResponseEntity.ok().body(editionDTOS);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/")
    public ResponseEntity<EditionDTO> createEdition(@RequestBody @Valid CreateEditionRequest request) {
        Edition edition = editionService.create(request.getName(), request.getSubmissionLimitDate());

        return ResponseEntity.ok().body(editionDTOMapper.toEditionDTO(edition));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{editionId}")
    public ResponseEntity<EditionDTO> updateEdition(@PathVariable("editionId") Integer editionId, @RequestBody @Valid UpdateEditionRequest request) {
        Edition edition = editionService.update(editionId, request.getName(), request.getSubmissionLimitDate());
        if (edition == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok().body(editionDTOMapper.toEditionDTO(edition));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{editionId}/start-camera-ready")
    public ResponseEntity<Object> startCameraReadyPhase(@PathVariable("editionId") Integer editionId) {
        Edition edition = editionService.startCameraReadyPhase(editionId);
        if (edition == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{editionId}/publish")
    public ResponseEntity<Object> publishArticles(@PathVariable("editionId") Integer editionId) {
        Edition edition = editionService.publishArticles(editionId);
        if (edition == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok().build();
    }

}
