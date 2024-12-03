package com.example.demo.Service;

import com.example.demo.Entity.Transaction;
import java.util.List;

public interface TransactionService {
    Transaction saveTransaction(Transaction transaction);
    List<Transaction> getTransactionsByUser(Long userId);
    void updateTransaction(Transaction transaction);
    List<Transaction> getRecentTransactionsByUser(Long userId);
   // List<Transaction> getTransactionGoal(Long userId);
}
