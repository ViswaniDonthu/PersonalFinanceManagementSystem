package com.example.demo.Service;

import com.example.demo.Entity.Goal;
import java.util.List;

public interface GoalService {
    Goal addGoal(Goal goal);
    List<Goal> getGoals(Long userId);
    Integer deletegoalbyid(Long goalId,Long userId);
}