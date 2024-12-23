package com.example.demo.Service;

import com.example.demo.Entity.MonthlySummary;
import com.example.demo.Entity.Transaction;
import com.example.demo.repo.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;

import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MonthlySummaryService {

    @Autowired
    private TransactionRepository transactionRepository;

    // Method to generate monthly summary for a specific user
    public List<MonthlySummary> getMonthlySummary(Long userId) {
        // Fetch transactions for the user
        List<Transaction> transactions = transactionRepository.findByRegisterId(userId);

        Map<String, List<Transaction>> groupedByMonth = transactions.stream()
                .collect(Collectors.groupingBy(transaction -> {
                    // Convert java.util.Date to LocalDate
                    LocalDate localDate = transaction.getDate();

                    // Get the month name from LocalDate
                    String monthName = localDate.getMonth()
                            .getDisplayName(java.time.format.TextStyle.SHORT, Locale.ENGLISH);
                    // Return formatted string "Month Year" (e.g., "Jan 2024")
                    return monthName + " " + localDate.getYear();
                }));

        List<MonthlySummary> summaries = new ArrayList<>();

        // Process each month and calculate the total credits and debits
        for (Map.Entry<String, List<Transaction>> entry : groupedByMonth.entrySet()) {
            String month = entry.getKey();
            double totalCredits = 0;
            double totalDebits = 0;

            for (Transaction transaction : entry.getValue()) {
                if ("credit".equals(transaction.getTransactionType())) {
                    totalCredits += transaction.getAmount();
                } else if ("debit".equals(transaction.getTransactionType())) {
                    totalDebits += transaction.getAmount();
                }
            }

            // Create MonthlySummary object and add it to the list
            summaries.add(new MonthlySummary(month, totalCredits, totalDebits));
        }

        return summaries;
    }
    public MonthlySummary getCurrentMonthSummary(Long userId) {
        // Get the current month and year
        LocalDate currentDate = LocalDate.now();
        Month currentMonth = currentDate.getMonth();
        int currentYear = currentDate.getYear();

        // Define the start and end of the current month
        LocalDate startOfMonth = LocalDate.of(currentYear, currentMonth, 1);
        LocalDate endOfMonth = startOfMonth.withDayOfMonth(startOfMonth.lengthOfMonth());

        // Fetch transactions for the user for the current month
        List<Transaction> transactions = transactionRepository.findByRegisterIdAndDateBetween(userId, startOfMonth, endOfMonth);

        // Initialize the totals
        double totalCredits = 0;
        double totalDebits = 0;

        // Process each transaction and calculate the totals
        for (Transaction transaction : transactions) {
            if ("credit".equals(transaction.getTransactionType())) {
                totalCredits += transaction.getAmount();
            } else if ("debit".equals(transaction.getTransactionType())) {
                totalDebits += transaction.getAmount();
            }
        }

        // Return the monthly summary for the current month
        return new MonthlySummary(currentMonth.getDisplayName(java.time.format.TextStyle.SHORT, java.util.Locale.ENGLISH) + " " + currentYear, totalCredits, totalDebits);
    }
}
