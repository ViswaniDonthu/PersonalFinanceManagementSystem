package com.example.demo.Service;

import com.example.demo.Entity.Goal;
import com.example.demo.repo.GoalRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalServiceImpl implements GoalService {

    @Autowired
    private GoalRepository goalRepository;

    @Override
    public Goal addGoal(Goal goal) {
        return goalRepository.save(goal);
    }

    @Override
    public List<Goal> getGoals(Long userId) {
        return goalRepository.findByRegisterId(userId);  // Fetch goals for a user
    }
    @Override
    @Transactional
    public Integer deletegoalbyid(Long goalId,Long userId){
        return goalRepository.deleteGoalByIdAndRegister_Id(goalId,userId);
    }
}
