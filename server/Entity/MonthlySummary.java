package com.example.demo.Entity;

public class MonthlySummary {
    private String month;
    private double totalCredits;
    private double totalDebits;

    // Constructor
    public MonthlySummary(String month, double totalCredits, double totalDebits) {
        this.month = month;
        this.totalCredits = totalCredits;
        this.totalDebits = totalDebits;
    }

    // Getters and setters
    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public double getTotalCredits() {
        return totalCredits;
    }

    public void setTotalCredits(double totalCredits) {
        this.totalCredits = totalCredits;
    }

    public double getTotalDebits() {
        return totalDebits;
    }

    public void setTotalDebits(double totalDebits) {
        this.totalDebits = totalDebits;
    }
}
