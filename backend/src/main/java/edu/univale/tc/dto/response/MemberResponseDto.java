package edu.univale.tc.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberResponseDto {
    private long memberId;
    private String memberName;
    private int tasksAmount;
    private int finishedTasksAmount;
    private String role;
}
