package edu.univale.tc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import edu.univale.tc.domain.Collaboration;
import edu.univale.tc.domain.Squad;
import edu.univale.tc.domain.User;
import edu.univale.tc.dto.response.CollaborationResponseDto;
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

    public List<CollaborationResponseDto> findAllByUserId(long userId) {
        User user = userService.findUserById(userId);
        List<Collaboration> collaborations = collaborationRepository.findByUserId(user);

        List<CollaborationResponseDto> collaborationResponseDtos = transformCollaborationResponseDtos(collaborations,
                user);

        return collaborationResponseDtos;
    }

    public List<CollaborationResponseDto> transformCollaborationResponseDtos(List<Collaboration> collaborations,
            User user) {
        List<Collaboration> foundedCollaborations = collaborations.stream().filter((c) -> c.getUserId().equals(user))
                .toList();

        List<CollaborationResponseDto> collaborationResponseDtos = foundedCollaborations.stream()
                .map((c) -> new CollaborationResponseDto(c.getSquadId().getId(), c.getSquadId().getName(),
                        c.getSquadId().getOwnerId().getUsername(),
                        c.getSquadId().getCollaboration().size()))
                .toList();
        return collaborationResponseDtos;
    }

}
