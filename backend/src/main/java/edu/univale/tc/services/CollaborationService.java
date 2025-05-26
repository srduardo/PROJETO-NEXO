package edu.univale.tc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.univale.tc.domain.Collaboration;
import edu.univale.tc.domain.Squad;
import edu.univale.tc.domain.User;
import edu.univale.tc.exceptions.ResourceNotFoundException;
import edu.univale.tc.repositories.CollaborationRepository;
import edu.univale.tc.repositories.SquadRepository;

@Service
public class CollaborationService {

    @Autowired
    private CollaborationRepository collaborationRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private SquadRepository squadRepository;

    public void createNewCollaboration(long userId, long squadId, String role) {
        Collaboration collaboration = new Collaboration();

        User user = userService.findUserById(userId);
        collaboration.setUserId(user);

        Squad squad = squadRepository.findById(squadId).orElseThrow(ResourceNotFoundException::new);
        collaboration.setSquadId(squad);

        collaboration.setRole(role);

        collaborationRepository.save(collaboration);
    }

    @Transactional
    public void deleteCollaboration(long squadId, long userId) {
        Squad squad = squadRepository.findById(squadId).orElseThrow(ResourceNotFoundException::new);
        User user = userService.findUserById(userId);

        collaborationRepository.deleteBySquadIdAndUserId(squad, user);
    }

}
