package com.example.demo.repo;

import com.example.demo.Entity.Balance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface BalanceRepo extends JpaRepository<Balance, Long> {
    List<Balance> findByRegisterId(Long userId);
    // You can define custom query methods here if needed
    Balance findBalanceByCardNumberAndRegisterId(String cardNumber, Long registerId);
    Balance findCardNumberByCardNumber(String cardNumber);
   @Query("SELECT COALESCE(SUM(b.amount), 0) FROM Balance b WHERE b.register.id = :id")
   Long getTotalBalanceByRegister_Id(@Param("id")Long id);


}








