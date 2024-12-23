//package com.example.demo.repo;
//
//import com.example.demo.Entity.Transaction;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface TransactionRepository extends JpaRepository<Transaction, Long> {
//}
package com.example.demo.repo;

import com.example.demo.Entity.Transaction;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByRegisterId(Long registerId);
   //void updateTransaction(Transaction transaction);
   @Query(value = "SELECT t FROM Transaction t where t.register.id=:id ORDER BY t.date DESC ")
   List<Transaction> findTop3RecentTransactions(Pageable pageable, @Param("id")Long id);
    List<Transaction> findByRegisterIdAndDateBetween(Long registerId, java.time.LocalDate startDate, java.time.LocalDate endDate);
}

