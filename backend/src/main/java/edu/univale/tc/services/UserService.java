package edu.univale.tc.services;

import edu.univale.tc.domain.Collaboration;
import edu.univale.tc.domain.User;
import edu.univale.tc.dto.request.UserRequestDto;
import edu.univale.tc.dto.response.UserResponseDto;
import edu.univale.tc.exceptions.InvalidCredentialsException;
import edu.univale.tc.exceptions.ResourceNotFoundException;
import edu.univale.tc.repositories.CollaborationRepository;
import edu.univale.tc.repositories.SquadRepository;
import edu.univale.tc.repositories.TaskRepository;
import edu.univale.tc.repositories.UserRepository;
import edu.univale.tc.services.security.JwtService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CollaborationRepository collaborationRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private SquadRepository squadRepository;

    private final BCryptPasswordEncoder encoderPassword = new BCryptPasswordEncoder(12);

    public List<UserResponseDto> findAllUsersResponse() {
        return userRepository.findAll().stream().map((user) -> new UserResponseDto(user, null)).toList();
    }

    public User findUserById(long id) {
        return userRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
    }

    public UserResponseDto findUserResponseById(long id) throws ResourceNotFoundException {
        User user = userRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return new UserResponseDto(user, null);
    }

    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email).orElseThrow(ResourceNotFoundException::new);
    }

    public UserResponseDto createUser(UserRequestDto userRequestDto) throws InvalidCredentialsException {
        if (userRequestDto == null || verifyEmail(userRequestDto.getEmail()))
            throw new InvalidCredentialsException();

        User newUser = new User();
        BeanUtils.copyProperties(userRequestDto, newUser);
        newUser.setPassword(encoderPassword.encode(newUser.getPassword()));
        userRepository.save(newUser);
        return new UserResponseDto(newUser, null);
    }

    public UserResponseDto updateUsername(long id, UserRequestDto newUsername) throws RuntimeException {
        User updatedUser = userRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

        if (newUsername == null)
            throw new IllegalArgumentException("Erro ao atualizar usuário!");

        updatedUser.setUsername(newUsername.getUsername());
        userRepository.save(updatedUser);
        return new UserResponseDto(updatedUser, null);
    }

    public void deleteUser(long id) {
        if (!userRepository.existsById(id))
            throw new ResourceNotFoundException("Usuário não encontrado!");

        User user = findUserById(id);

        collaborationRepository.deleteAllById(
                user.getCollaboration().stream()
                        .map(Collaboration::getId)
                        .toList());
        taskRepository.deleteAll(user.getTasks());
        squadRepository.deleteAll(user.getOwnedSquads());
        userRepository.deleteById(id);
    }

    private boolean verifyEmail(String userEmail) {
        List<String> storedEmails = userRepository.findAllUserEmails();
        Collections.sort(storedEmails);
        return Collections.binarySearch(storedEmails, userEmail) > -1;
    }

    public UserResponseDto verifyAuthentication(UserRequestDto userRequestDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userRequestDto.getEmail(), userRequestDto.getPassword()));

        if (!authentication.isAuthenticated()) {
            throw new InvalidCredentialsException("Authenticação inválida");
        }
        User user = findUserByEmail(userRequestDto.getEmail());

        return new UserResponseDto(user, jwtService.generateToken(user.getEmail()));
    }
}
