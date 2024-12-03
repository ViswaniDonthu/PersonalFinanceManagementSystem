package com.example.demo.Service;

import com.example.demo.Entity.Balance;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BalanceService {
    Balance addAccount(Balance balance);
    List<Balance> getAccountByUser(Long userId);
   Balance getAmountByIdandAccount(Long id,String accountNumber);
   Boolean findCardNumber(String cardNumber);

   Long getTotalAmountById(Long id);
}
