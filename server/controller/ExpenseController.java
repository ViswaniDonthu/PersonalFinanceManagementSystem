package com.example.demo.controller;
import com.example.demo.Entity.MonthlySummary;
import com.example.demo.Service.MonthlySummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/expenses")
public class ExpenseController {

    @Autowired
    private MonthlySummaryService monthlySummaryService;

    // Endpoint to get monthly summary for a user
    @GetMapping("/monthly-summary/{userId}")
    public ResponseEntity<List<MonthlySummary>> getMonthlySummary(@PathVariable Long userId) {
        List<MonthlySummary> summaries = monthlySummaryService.getMonthlySummary(userId);
        return ResponseEntity.ok(summaries);
    }
    @GetMapping("/eachmonth-summary/{userId}")
    public MonthlySummary getEachMonthSummary(@PathVariable Long userId) {
        return monthlySummaryService.getCurrentMonthSummary(userId);
    }
}
