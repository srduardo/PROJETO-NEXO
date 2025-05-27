package edu.univale.tc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.univale.tc.domain.Squad;
import edu.univale.tc.domain.User;

import java.util.Optional;


@Repository
public interface SquadRepository extends JpaRepository<Squad, Long>{
     Optional<Squad> findByOwnerId(User ownerId);
}
