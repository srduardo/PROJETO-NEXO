package edu.univale.tc.dto.request;

import edu.univale.tc.domain.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequestDto {
    @NotBlank
    @Size(max = 100)
    private String title;
    @NotBlank
    @Size(max = 300)
    private String description;

    public TaskRequestDto(Task task) {
        this.title = task.getTitle();
        this.description = task.getDescription();
    }
}
