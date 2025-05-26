package edu.univale.tc.dto.response;

import edu.univale.tc.domain.Squad;
import edu.univale.tc.domain.User;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SquadResponseDto {
    @Min(1)
    private long id;
    @NotBlank
    @Size(max = 250)
    private String name;
    @NotNull
    private User owner;

    public SquadResponseDto(Squad squad) {
        this.id = squad.getId();
        this.name = squad.getName();
        this.owner = squad.getOwnerId();
    }
}
