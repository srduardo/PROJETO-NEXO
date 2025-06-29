package edu.univale.tc.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String description;
    private String status;
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User ownerId;
    @ManyToOne
    @JoinColumn(name = "squad_id")
    private Squad squadId;
}
