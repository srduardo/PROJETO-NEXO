package edu.univale.tc.services;

import edu.univale.tc.domain.Squad;
import edu.univale.tc.domain.Task;
import edu.univale.tc.domain.User;
import edu.univale.tc.dto.request.TaskRequestDto;
import edu.univale.tc.dto.response.TaskResponseDto;
import edu.univale.tc.exceptions.ResourceNotFoundException;
import edu.univale.tc.repositories.TaskRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private SquadService squadService;

    public TaskResponseDto findTaskResponseById(long id) {
        Task task = taskRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        return new TaskResponseDto(task);
    }

    public Task findTaskById(long id) {
        return taskRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
    }

    public List<TaskResponseDto> findAllTasksResponse() {
        return taskRepository.findAll().stream().map(TaskResponseDto::new).toList();
    }

    public TaskResponseDto createNewTask(TaskRequestDto taskRequestDto, long squadId, long userId) {
        if (taskRequestDto == null) throw new IllegalArgumentException("Erro ao criar tarefa!");

        Task task = new Task();
        task.setTitle(taskRequestDto.getTitle());
        task.setDescription(taskRequestDto.getDescription());

        User user = userService.findUserById(userId);
        task.setOwnerId(user);

        Squad squad = squadService.findSquadById(squadId);
        task.setSquadId(squad);

        task.setStatus("PENDENTE");

        taskRepository.save(task);
        return new TaskResponseDto(task);
    }

    public TaskResponseDto updateTaskData(TaskRequestDto taskRequestDto, long taskId) {
        if (taskRequestDto == null && !taskRepository.existsById(taskId)) throw new IllegalArgumentException("Erro ao atualizar tarefa!");

        Task task = findTaskById(taskId);
        BeanUtils.copyProperties(taskRequestDto, task);
        
        taskRepository.save(task);
        return new TaskResponseDto(task);
    }

    public void deleteTaskById(long taskId) {
        if (!taskRepository.existsById(taskId)) throw new ResourceNotFoundException();

        taskRepository.deleteById(taskId);
    }

    public TaskResponseDto updateStatus(String newStatus, long taskId) {
        if (newStatus == null && !taskRepository.existsById(taskId)) throw new IllegalArgumentException("Erro ao atualizar tarefa!");

        Task task = findTaskById(taskId);
        task.setStatus(newStatus);
        
        taskRepository.save(task);
        return new TaskResponseDto(task);
    }

}
