package edu.univale.tc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.univale.tc.domain.Collaboration;
import edu.univale.tc.domain.Squad;
import edu.univale.tc.domain.User;

@Repository
public interface CollaborationRepository extends JpaRepository<Collaboration, Long> {
    void deleteBySquadIdAndUserId(Squad squadId, User userId);
}
