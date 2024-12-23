package com.example.demo.repo;

import com.example.demo.Entity.Goal;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    List<Goal> findByRegisterId(long userId);

    Integer deleteGoalByIdAndRegister_Id(Long goalId,Long userId);

//@Query("update Goal g set g.progresstarget = g.progresstarget+:target1 where g.register.id = :registerId and g.goalName = :goalName")
@Query("UPDATE Goal g SET g.progresstarget = COALESCE(g.progresstarget, 0) + :target1 WHERE g.register.id = :registerId AND g.goalName = :goalName")

@Modifying
   @Transactional
   int updateProgresstargetByRegister_IdAndGoalName(Long registerId, String goalName,float target1);

}
