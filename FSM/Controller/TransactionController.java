
package com.example.demo.controller;

import com.example.demo.Entity.Transaction;
import com.example.demo.Service.BalanceService;
import com.example.demo.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.repo.BalanceRepo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;
    @Autowired
    private BalanceService balanceservice;

    @PostMapping("/save")
    public ResponseEntity<?> createTransaction(@RequestBody Transaction transaction) {
        transactionService.saveTransaction(transaction);
        transactionService.updateTransaction(transaction);
        return ResponseEntity.ok(Map.of("message", "Transaction created successfully"));
    }

    @GetMapping("/users/{userId}")
    public List<Transaction> getTransactionsByUser(@PathVariable Long userId) {
        return transactionService.getTransactionsByUser(userId);
    }

    @PostMapping("/accountcheck")
    public ResponseEntity<?> checkTransaction(@RequestBody Map<String, String> Account) {
        String account_number = Account.get("accountNumber");
        if (balanceservice.findCardNumber(account_number)) {
            System.out.println(true);
            return ResponseEntity.ok(Map.of("present", true));
        } else {
            System.out.println(false);
            return ResponseEntity.ok(Map.of("present", false));
        }

    }

    @GetMapping("/recenttransactions/{userId}")
    public List<Transaction> getRecentTransactions(@PathVariable Long userId) {
        return transactionService.getRecentTransactionsByUser(userId);
    }

    @GetMapping("/goalandamount/{userId}")
    public Map<String, Double> getTransactionsbyGoal(@PathVariable Long userId) {
        //return transactionService.getTransactionGoal(userId);
        List<Transaction> user = transactionService.getTransactionsByUser(userId);
        Map<String, Double> goalAmountMap = new HashMap<>();
        for (Transaction transaction : user) {
            String goal = transaction.getGoal();
            Double amount = (double)transaction.getAmount();

            goalAmountMap.put(goal, goalAmountMap.getOrDefault(goal, 0.0) + amount);
        }

   return goalAmountMap;
    }
}