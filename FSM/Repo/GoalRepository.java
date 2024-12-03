package com.example.demo.repo;

import com.example.demo.Entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    List<Goal> findByRegisterId(long userId);

    Integer deleteGoalByIdAndRegister_Id(Long goalId,Long userId);
}
