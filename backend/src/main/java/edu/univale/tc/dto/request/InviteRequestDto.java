package edu.univale.tc.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InviteRequestDto {
    @NotBlank
    private String receiverEmail;
    @Min(1)
    private long squadId;
}
