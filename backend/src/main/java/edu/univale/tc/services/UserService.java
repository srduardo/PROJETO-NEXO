package edu.univale.tc.services;

import edu.univale.tc.domain.User;
import edu.univale.tc.dto.request.UserRequestDto;
import edu.univale.tc.dto.response.UserResponseDto;
import edu.univale.tc.exceptions.InvalidCredentialsException;
import edu.univale.tc.exceptions.ResourceNotFoundException;
import edu.univale.tc.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // GET methods:

    public List<UserResponseDto> findAllUsers() {
        return userRepository.findAll().stream().map(user -> new UserResponseDto(user.getUsername(), user.getEmail())).toList();
    }

    public UserResponseDto findUserById(Integer id) throws ResourceNotFoundException {
        User user = userRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return new UserResponseDto(user);
    }

    // POST method:

    public UserResponseDto createUser(UserRequestDto userRequestDto) throws InvalidCredentialsException {
        if (userRequestDto == null || verifyEmail(userRequestDto.getEmail())) {
            throw new InvalidCredentialsException();
        }

        User newUser = new User();
        BeanUtils.copyProperties(userRequestDto, newUser);
        userRepository.saveAndFlush(newUser);
        return new UserResponseDto(newUser);
    }

    // PUT method:

    public UserResponseDto updateUser(Integer id, UserRequestDto userRequestDto) throws RuntimeException {
        if (userRequestDto == null || verifyEmail(userRequestDto.getEmail())) {
            throw new InvalidCredentialsException();
        }

        User updatedUser = userRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        BeanUtils.copyProperties(userRequestDto, updatedUser);
        userRepository.saveAndFlush(updatedUser);
        return new UserResponseDto(updatedUser);
    }

    // DELETE method:

    public UserResponseDto deleteUser(Integer id) {
        User user = userRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        UserResponseDto userResponseDto = new UserResponseDto(user);
        userRepository.deleteById(id);
        return userResponseDto;
    }

    // Verify method:

    private boolean verifyEmail(String userEmail) {
        List<String> storedEmails = userRepository.findAllUserEmails();
        Collections.sort(storedEmails);
        return Collections.binarySearch(storedEmails, userEmail) > -1;
    }

}
