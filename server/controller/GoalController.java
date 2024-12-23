package com.example.demo.controller;

import com.example.demo.Entity.Goal;
import com.example.demo.Service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goals")
@CrossOrigin(origins = "http://localhost:5173")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @PostMapping
    public Goal createGoal(@RequestBody Goal goal) {
        return goalService.addGoal(goal);
    }

    @GetMapping("/{userId}")
    public List<Goal> getAllGoals(@PathVariable Long userId) {
        System.out.println(userId);
        return goalService.getGoals(userId);
    }
   @DeleteMapping("deletegoal/{goalId}/{userId}")
  public Boolean deleteGoal(@PathVariable Long goalId,@PathVariable Long userId) {
        System.out.println(goalId);
      int c= goalService.deletegoalbyid(goalId,userId);
       return c > 0;
  }
}
