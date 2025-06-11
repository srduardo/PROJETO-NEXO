package edu.univale.tc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.univale.tc.dto.response.MemberResponseDto;
import edu.univale.tc.dto.response.SquadResponseDto;
import edu.univale.tc.services.CollaborationService;

@RestController
@RequestMapping("/api/collaborations")
public class CollaborationController {
    
    @Autowired
    private CollaborationService collaborationService;

    @GetMapping("/squad/{userId}")
    public ResponseEntity<List<SquadResponseDto>> getAllByUserId(@PathVariable long userId) {
        return ResponseEntity.ok(collaborationService.findAllByUserId(userId));
    }

    @GetMapping("/member/{squadId}")
    public ResponseEntity<List<MemberResponseDto>> getAllBySquadId(@PathVariable long squadId) {
        return ResponseEntity.ok(collaborationService.findAllBySquadId(squadId));
    }



}
