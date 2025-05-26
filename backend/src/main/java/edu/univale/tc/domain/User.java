package edu.univale.tc.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String email;
    private String password;
    @OneToMany(mappedBy = "userId")
    private List<Collaboration> collaboration;
    @OneToMany(mappedBy = "ownerId")
    @JsonIgnore
    private List<Task> tasks;
    @OneToMany(mappedBy = "ownerId")
    @JsonIgnore
    private List<Squad> ownedSquads;
}
