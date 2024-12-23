package com.example.demo.Service;

import com.example.demo.Entity.Bill;
import com.example.demo.repo.BillRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BillServiceImp implements BillService {

    @Autowired
    private BillRepository billRepository;
    @Autowired
    private EmailService emailService;

    @Override
    public Bill addBill(Bill bill) {
        // String recipientEmail = savedBill.getRegister().getEmail();

       return billRepository.save(bill);
    }

    @Override
    public List<Bill> getBillsByUser(Long userId) {
        return billRepository.findByRegisterId(userId); // Assuming a method `findByRegisterId` exists in BillRepository
    }
    @Override
    public List<Bill> upcomingBills(Long userId){
        System.out.println(userId +""+LocalDate.now());
        List<Bill> user= billRepository.findByRegisterIdAndDueDateAfter(userId, LocalDate.now());
        System.out.println(user);
        return user;
    }
    @Transactional
    @Override
    public Integer deleteBillbyId(Long billId,Long userId) {
        return billRepository.deleteBillByIdAndRegisterId(billId, userId);
    }
}
