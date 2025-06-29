package edu.univale.tc.domain;

import java.util.List;

import edu.univale.tc.dto.request.SquadRequestDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "squads")
public class Squad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @OneToMany(mappedBy = "squadId")
    private List<Collaboration> collaboration;
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User ownerId;
    @OneToMany(mappedBy = "squadId")
    private List<Task> tasks;

    public Squad(SquadRequestDto squadRequestDto, User user) {
        this.name = squadRequestDto.getName();
        this.ownerId = user;
    }
}
