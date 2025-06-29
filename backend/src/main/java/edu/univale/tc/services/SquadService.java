package edu.univale.tc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import edu.univale.tc.domain.Squad;
import edu.univale.tc.domain.User;
import edu.univale.tc.dto.request.SquadRequestDto;
import edu.univale.tc.dto.response.SquadResponseDto;
import edu.univale.tc.exceptions.ResourceNotFoundException;
import edu.univale.tc.repositories.SquadRepository;
import edu.univale.tc.repositories.TaskRepository;
import jakarta.transaction.Transactional;

@Service
public class SquadService {

    @Autowired
    private SquadRepository squadRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CollaborationService collaborationService;

    @Autowired
    private TaskRepository taskRepository;

    public List<SquadResponseDto> findAllSquadsResponse() {
        return squadRepository.findAll().stream().map(SquadResponseDto::new).toList();
    }

    public Squad findSquadById(long id) {
        return squadRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
    }

    public SquadResponseDto findSquadResponseById(long id) {
        return new SquadResponseDto(squadRepository.findById(id).orElseThrow(ResourceNotFoundException::new));
    }

    public SquadResponseDto createNewSquad(SquadRequestDto squadRequestDto, long userId) {
        User user = userService.findUserById(userId);

        if (squadRequestDto == null) throw new IllegalArgumentException("Erro ao criar nova equipe!");

        Squad newSquad = new Squad(squadRequestDto, user);
        newSquad = squadRepository.save(newSquad);

        collaborationService.createNewCollaboration(userId, newSquad.getId(), "OWNER");

        return new SquadResponseDto(newSquad.getId(), newSquad.getName(), user.getId(), newSquad.getOwnerId().getUsername(), 1);
    }

    public SquadResponseDto updateSquadName(long id, SquadRequestDto squadRequestDto) {        
        Squad updatedSquad = findSquadById(id);

        if (squadRequestDto == null) throw new IllegalArgumentException("Erro ao atualizar nome da equipe!");

        updatedSquad.setName(squadRequestDto.getName());
        squadRepository.save(updatedSquad);
        
        return new SquadResponseDto(updatedSquad);
    }

    @Transactional
    public void deleteSquadBySquadIdAndUserId(long squadId) {
        if (!squadRepository.existsById(squadId)) throw new ResourceNotFoundException("Equipe não encontrada!");
        Squad squad = findSquadById(squadId);
        
        collaborationService.deleteAllCollaborationsBySquad(squadId);
        
        taskRepository.deleteAllBySquadId(squad);

        squadRepository.deleteById(squadId);
    }


}
