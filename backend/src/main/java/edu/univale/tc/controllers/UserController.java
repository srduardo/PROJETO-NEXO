package edu.univale.tc.controllers;

import edu.univale.tc.dto.request.UserRequestDto;
import edu.univale.tc.dto.response.JwtResponseDto;
import edu.univale.tc.dto.response.UserResponseDto;
import edu.univale.tc.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(userService.findAllUsersResponse());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.findUserResponseById(id));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponseDto> loginUser(@Valid @RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok(userService.verifyAuthentication(userRequestDto));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> registerUser(@Valid @RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.status(201).body(userService.createUser(userRequestDto));
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<UserResponseDto> updateUsername(@PathVariable Integer id, @Valid @RequestBody String userRequestDto) {
        return ResponseEntity.ok(userService.updateUsername(id, userRequestDto));
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<UserResponseDto> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.status(204).build();
    }
}
