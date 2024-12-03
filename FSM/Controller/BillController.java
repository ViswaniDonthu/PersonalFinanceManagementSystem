package com.example.demo.controller;


import com.example.demo.Entity.Bill;
import com.example.demo.Service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
@CrossOrigin(origins = "http://localhost:5173")
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping
    public Bill createBill(@RequestBody Bill bill) {

        return billService.addBill(bill);
    }

    @GetMapping("/userbills/{userId}")
    public List<Bill> getBillsByUser(@PathVariable Long userId) {
        System.out.println(userId);
        // Use the instance of the service instead of the class
        return billService.getBillsByUser(userId);
    }

 @GetMapping("/upcomingbills/{userId}")
    public List<Bill> getUpcomingBillsByUser(@PathVariable Long userId) {
        System.out.println("in getUpcomingBillsByUser");
        return billService.upcomingBills(userId);
 }
    @DeleteMapping("deletebill/{billId}/{userId}")
    public Boolean deleteGoal(@PathVariable Long billId,@PathVariable Long userId) {
        System.out.println(billId);
        int c= billService.deleteBillbyId(billId,userId);
        return c > 0;
    }
}
