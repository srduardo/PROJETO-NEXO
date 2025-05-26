package edu.univale.tc.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SquadRequestDto {
    private long id;
    @NotBlank
    @Size(max = 250)
    private String name;
}
