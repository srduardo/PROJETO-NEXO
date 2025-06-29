package edu.univale.tc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    @GetMapping("/member/{squadId}/{userId}")
    public ResponseEntity<MemberResponseDto> getAllByUserId(@PathVariable long squadId, @PathVariable long userId) {
        return ResponseEntity.ok(collaborationService.findBySquadIdAndUserId(squadId, userId));
    }

    @GetMapping("/squad/{userId}")
    public ResponseEntity<List<SquadResponseDto>> getAllByUserId(@PathVariable long userId) {
        return ResponseEntity.ok(collaborationService.findAllByUserId(userId));
    }

    @GetMapping("/member/{squadId}")
    public ResponseEntity<List<MemberResponseDto>> getAllBySquadId(@PathVariable long squadId) {
        return ResponseEntity.ok(collaborationService.findAllBySquadId(squadId));
    }

    @GetMapping("/squad/{squadId}/owner")
    public ResponseEntity<MemberResponseDto> getSquadOwner(@PathVariable long squadId) {
        return ResponseEntity.ok(collaborationService.findSquadOwnerBySquadId(squadId));
    }

    @DeleteMapping("/member/{squadId}/{userId}/delete")
    public ResponseEntity<Object> deleteMember(@PathVariable long squadId, @PathVariable long userId) {
        collaborationService.deleteCollaboration(squadId, userId);
        return ResponseEntity.status(204).build();  
    }

}
