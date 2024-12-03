//package com.example.demo.Service;
//
//import com.example.demo.Entity.Balance;
//import com.example.demo.repo.BalanceRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class BalanceServiceImpl implements BalanceService {
//
//    @Autowired
//    private BalanceRepo balanceRepository;
//
//    @Override
//    public Balance addBalance(Balance balance) {
//        return balanceRepository.save(balance);
//    }
//
//    @Override
//    public List<Balance> getBalances(Long userId) {
//        // Assuming there is a field to associate balances with userId, modify as needed
//        return balanceRepository.findByRegisterId(userId);
//    }
//}
package com.example.demo.Service;

import com.example.demo.Entity.Balance;
import com.example.demo.repo.BalanceRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BalanceServiceImpl implements BalanceService {

    @Autowired
    private BalanceRepo balanceRepository;

    @Override
    public Balance addAccount(Balance balance) {
        return balanceRepository.save(balance);
    }

    @Override
    public List<Balance> getAccountByUser(Long userId) {
        return balanceRepository.findByRegisterId(userId); // Assuming a method `findByRegisterId` exists in BillRepository
    }

    @Override
    public Balance getAmountByIdandAccount(Long id, String accountNumber) {
        return balanceRepository.findBalanceByCardNumberAndRegisterId(accountNumber, id);
    }

    @Override
    public Boolean findCardNumber(String cardNumber) {
        System.out.println(cardNumber);
        Balance user = balanceRepository.findCardNumberByCardNumber(cardNumber);
        if (user == null) {
            return false;
        } else if (user.getCardNumber().equals(cardNumber)) {
            return true;
        }
        return false;
    }
    @Override
    public Long getTotalAmountById(Long id) {
       return balanceRepository.getTotalBalanceByRegister_Id(id);
    }
}
