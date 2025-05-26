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

@Service
public class SquadService {

    @Autowired
    private SquadRepository squadRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CollaborationService collaborationService;

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
        
        return new SquadResponseDto(newSquad);
    }

    public SquadResponseDto updateSquadName(long id, String name) {        
        Squad updatedSquad = findSquadById(id);

        if (name == null) throw new IllegalArgumentException("Erro ao atualizar nome da equipe!");

        updatedSquad.setName(name);
        squadRepository.save(updatedSquad);
        
        return new SquadResponseDto(updatedSquad);
    }

    public void deleteSquadBySquadIdAndUserId(long squadId, long userId) {
        if (!squadRepository.existsById(squadId)) throw new ResourceNotFoundException("Equipe não encontrada!");

        collaborationService.deleteCollaboration(squadId, userId);
        squadRepository.deleteById(squadId);
    }

}
