package com.example.demo.controller;


import com.example.demo.Entity.Balance;
import com.example.demo.Service.BalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/balances")
@CrossOrigin(origins = "http://localhost:5173")
public class BalanceController {

    @Autowired
    private BalanceService balanceService;

    @PostMapping
    public Balance createBill(@RequestBody Balance balance) {

        return balanceService.addAccount(balance);
    }

    @GetMapping("/{userId}")
    public List<Balance> getBillsByUser(@PathVariable Long userId) {
        System.out.println(userId);
        // Use the instance of the service instead of the class
        return balanceService.getAccountByUser(userId);
    }
    @GetMapping("totalbalance/{userID}")
    public ResponseEntity<?> gettotalBalance(@PathVariable Long userID){
        System.out.println("in gettotalbalance");
       Long amount= balanceService.getTotalAmountById(userID);
        return ResponseEntity.ok(Map.of("amount", Objects.requireNonNullElse(amount, 0)));
    }

}
