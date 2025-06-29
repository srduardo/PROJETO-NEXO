package edu.univale.tc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.univale.tc.dto.request.TaskRequestDto;
import edu.univale.tc.dto.response.TaskResponseDto;
import edu.univale.tc.services.TaskService;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskResponseDto>> getAllTasks() {
        return ResponseEntity.ok(taskService.findAllTasksResponse());
    }

    @GetMapping("/{squadId}/{userId}")
    public ResponseEntity<List<TaskResponseDto>> getAllTasksByUserIdAndSquadId(@PathVariable long squadId, @PathVariable long userId) {
        return ResponseEntity.ok(taskService.findAllTasksResponseByUserIdAndSquadId(squadId, userId));
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<TaskResponseDto> getTaskById(@PathVariable long taskId) {
        return ResponseEntity.ok(taskService.findTaskResponseById(taskId));
    }

    @PostMapping("/{squadId}/{userId}/create")
    public ResponseEntity<TaskResponseDto> createTask(@RequestBody TaskRequestDto taskRequestDto,
            @PathVariable long squadId, @PathVariable long userId) {
        return ResponseEntity.status(201).body(taskService.createNewTask(taskRequestDto, squadId, userId));
    }

    @PutMapping("/{taskId}/update")
    public ResponseEntity<TaskResponseDto> updateTask(@RequestBody TaskRequestDto taskRequestDto,
            @PathVariable long taskId) {
        return ResponseEntity.ok(taskService.updateTaskData(taskRequestDto, taskId));
    }

    @DeleteMapping("/{taskId}/delete")
    public ResponseEntity<Void> deleteTask(@PathVariable long taskId) {
        taskService.deleteTaskById(taskId);
        return ResponseEntity.status(204).build();
    }
}
