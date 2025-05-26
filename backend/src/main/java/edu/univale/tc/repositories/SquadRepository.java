package edu.univale.tc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.univale.tc.domain.Squad;

@Repository
public interface SquadRepository extends JpaRepository<Squad, Long>{
     
}
