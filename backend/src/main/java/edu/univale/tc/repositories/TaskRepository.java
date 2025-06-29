package edu.univale.tc.repositories;

import edu.univale.tc.domain.Squad;
import edu.univale.tc.domain.Task;
import edu.univale.tc.domain.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    void deleteAllBySquadId(Squad squadId);
    void deleteAllBySquadIdAndOwnerId(Squad squadId, User ownerId);
}
