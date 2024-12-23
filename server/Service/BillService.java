
package com.example.demo.Service;

import com.example.demo.Entity.Bill;

import java.util.List;

public interface BillService {
    Bill addBill(Bill bill);
    List<Bill> getBillsByUser(Long userId);
    List<Bill> upcomingBills(Long userId);
    Integer deleteBillbyId(Long billId,Long userId);
}

