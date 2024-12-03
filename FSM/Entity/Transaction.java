//package com.example.demo.Entity;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import jakarta.persistence.*;
//import org.antlr.v4.runtime.misc.NotNull;
//
//import java.util.Date;
//
//@Entity
//public class Transaction {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//    private String account;
//    private String Goal;
//    private Date date;
//    private String paymentType;
//    private Float amount;
//    public Float getAmount() {
//        return amount;
//    }
//
//    public void setAmount(Float amount) {
//        this.amount = amount;
//    }
//
//    public String getGoal() {
//        return Goal;
//    }
//
//    public void setGoal(String goal) {
//        Goal = goal;
//    }
//
//
//
//    @ManyToOne(cascade = CascadeType.ALL)
//   // @JoinColumn(name = "register_id", nullable = false)
//    private Register register;
//
//    // Getters and Setters
//    public Integer getId() {
//        return id;
//    }
//
//    public void setId(Integer id) {
//        this.id = id;
//    }
//
//    public String getAccount() {
//        return account;
//    }
//
//    public void setAccount(String account) {
//        this.account = account;
//    }
//
//    public Date getDate() {
//        return date;
//    }
//
//    public void setDate(Date date) {
//        this.date = date;
//    }
//
//    public String getPaymentType() {
//        return paymentType;
//    }
//
//    public void setPaymentType(String paymentType) {
//        this.paymentType = paymentType;
//    }
//
//    public Register getRegister() {
//        return register;
//    }
//
//    public void setRegister(Register register) {
//        this.register = register;
//    }
//}
package com.example.demo.Entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String account;
    private String goal;


    private LocalDate date;
    private String transactionType;
    private String accountNumber;
    private Float amount;

    @ManyToOne
    @JoinColumn(name = "register_id")
    private Register register;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }



    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Register getRegister() {
        return register;
    }

    public void setRegister(Register register) {
        this.register = register;
    }

    public String getTransactionType() {
        return transactionType;
    }
}
