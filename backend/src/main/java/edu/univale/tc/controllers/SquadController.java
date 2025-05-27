package edu.univale.tc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.univale.tc.dto.request.SquadRequestDto;
import edu.univale.tc.dto.response.CollaborationResponseDto;
import edu.univale.tc.dto.response.SquadResponseDto;
import edu.univale.tc.services.CollaborationService;
import edu.univale.tc.services.SquadService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/squads")
@CrossOrigin(origins = "http://localhost:5173")
public class SquadController {

    @Autowired
    private SquadService squadService;

    @Autowired
    private CollaborationService collaborationService;

    @GetMapping
    public ResponseEntity<List<SquadResponseDto>> getAllSquads() {
        return ResponseEntity.ok(squadService.findAllSquadsResponse());
    }
    
    @GetMapping("/{squadId}")
    public ResponseEntity<SquadResponseDto> getSquadById(@PathVariable long squadId) {
        return ResponseEntity.ok(squadService.findSquadResponseById(squadId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CollaborationResponseDto>> getAllCollaborationsByUserId(@PathVariable long userId) {
        return ResponseEntity.ok(collaborationService.findAllByUserId(userId));
    }

    @PostMapping("/{userId}/create")
    public ResponseEntity<CollaborationResponseDto> createSquad(@RequestBody SquadRequestDto squadRequestDto, @PathVariable long userId) {
        return ResponseEntity.status(201).body(squadService.createNewSquad(squadRequestDto, userId));
    }

    @PutMapping("/{squadId}/update")
    public ResponseEntity<SquadResponseDto> putSquadName(@RequestBody String name, @PathVariable long squadId) {
        return ResponseEntity.ok(squadService.updateSquadName(squadId, name));
    }

    @DeleteMapping("/{squadId}/{userId}/delete")
    public ResponseEntity<Object> deleteSquad(@PathVariable long squadId, @PathVariable long userId) {
        squadService.deleteSquadBySquadIdAndUserId(squadId, userId);
        return ResponseEntity.status(204).build();
    }
}
