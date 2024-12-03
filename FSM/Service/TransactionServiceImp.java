package com.example.demo.Service;

import com.example.demo.Entity.Balance;

import com.example.demo.Entity.Transaction;

import com.example.demo.repo.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import static java.lang.Float.parseFloat;

@Service
public class TransactionServiceImp implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepo;
    @Autowired
    private  BalanceService balanceService;

    @Override
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepo.save(transaction);
    }

    @Override
    public List<Transaction> getTransactionsByUser(Long userId) {
        return transactionRepo.findByRegisterId(userId);
    }

    public void updateTransaction(Transaction transaction) {
        if (transaction.getTransactionType().equals("debit")) {
            System.out.println("debit");
            // Subtract the amount from the user's balance
            Long userId = transaction.getRegister().getId();
            Float amount = transaction.getAmount();
            if (transaction.getAmount() >= amount) {
                System.out.println(transaction.getAccountNumber());
          Balance user=  balanceService.getAmountByIdandAccount(transaction.getRegister().getId(),transaction.getAccountNumber());
                System.out.println(user.getAmount()) ;
               amount=user.getAmount()-amount;
               user.setAmount(amount);
     ;           transactionRepo.save(transaction);  // Save the updated user
            } else {
                throw new RuntimeException("Insufficient balance");
            }
        }else if(transaction.getTransactionType().equals("credit")){
            System.out.println("credit");
            Long userId = transaction.getRegister().getId();
            Float amount = transaction.getAmount();
            System.out.println(transaction.getAccountNumber());
            Balance user=  balanceService.getAmountByIdandAccount(transaction.getRegister().getId(),transaction.getAccountNumber());
            System.out.println(user.getAmount()) ;
            amount=user.getAmount()+amount;
            user.setAmount(amount);
            transactionRepo.save(transaction);
        }
    }

    @Override
   public  List<Transaction> getRecentTransactionsByUser(Long userId) {
        Pageable pageable = PageRequest.of(0, 3);
        return transactionRepo.findTop3RecentTransactions(pageable,userId);
   }
//   @Override
//    public List<Transaction> getTransactionGoal(Long UserId){
//        return transactionRepo.getGoalAndAmountOrderByRegister_Id(UserId);
//   }
}