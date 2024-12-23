//package com.example.demo.repo;
//import com.example.demo.Entity.Bill;
//import com.example.demo.Entity.Transaction;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface BillRepository extends JpaRepository<Bill, Long> {
//    List<Bill> findByRegisterId(Long registerId);
//}
//
package com.example.demo.repo;

import com.example.demo.Entity.Bill;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
    @Query("SELECT b FROM Bill b WHERE b.register.id = :userId")
    List<Bill> findByRegisterId(@Param("userId") Long userId);

    // @Query("SELECT b FROM Bill b WHERE b.register.id = :id AND b.dueDate> :dueDate")
    List<Bill> findByRegisterIdAndDueDateAfter(@Param("id") Long id, @Param("dueDate") LocalDate dueDate);
Integer deleteBillByIdAndRegisterId(Long id, Long registerId);
    List<Bill> findByDueDate(LocalDate dueDate);
}

