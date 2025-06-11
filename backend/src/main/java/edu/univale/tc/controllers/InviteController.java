package edu.univale.tc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.univale.tc.dto.request.AcceptRequestDto;
import edu.univale.tc.dto.request.InviteRequestDto;
import edu.univale.tc.services.InviteService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;


@RestController
@RequestMapping("/api/invites")
public class InviteController {

    @Autowired
    private InviteService inviteService;

    @PostMapping
    public ResponseEntity<Object> inviteUser(@RequestBody InviteRequestDto inviteRequestDto, @RequestHeader(name = "Authorization") String auth) {
        inviteService.createInvite(inviteRequestDto, auth);
        return ResponseEntity.status(204).build();
    }

    @PostMapping("/accept")
    public ResponseEntity<Object> accept(@RequestBody AcceptRequestDto acceptRequestDto, @RequestHeader(name = "Authorization") String auth) {
        inviteService.acceptInvite(acceptRequestDto, auth);
        return ResponseEntity.status(204).build();
    }
    
    

}
