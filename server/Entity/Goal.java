package com.example.demo.Entity;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Value;

@Entity
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String goalName;
    private Float target;
    @Value("${default.progresstarget:0.0}")
    private Float progresstarget;
    @ManyToOne
    @JoinColumn(name = "register_id", nullable = false)
    private Register register;

    // Getters and setters

    public Float getProgresstarget() {
        return progresstarget;
    }

    public void setProgresstarget(Float progresstarget) {
        this.progresstarget = progresstarget;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGoalName() {
        return goalName;
    }

    public void setGoalName(String goalName) {
        this.goalName = goalName;
    }

    public Float getTarget() {
        return target;
    }

    public void setTarget(Float target) {
        this.target = target;
    }

    public Register getRegister() {
        return register;
    }

    public void setRegister(Register register) {
        this.register = register;
    }
}
