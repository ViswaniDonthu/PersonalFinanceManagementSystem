package com.example.demo.Service;

import com.example.demo.Entity.Bill;
import com.example.demo.repo.BillRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class NotificationService {

    private final BillRepository billRepository;
    private final EmailService emailService;

    public NotificationService(BillRepository billRepository, EmailService emailService) {
        this.billRepository = billRepository;
        this.emailService = emailService;
    }

    // Run daily at 8 AM to check for upcoming due dates
    @Scheduled(cron = "0 28 17 * * ?")
    public void sendDueDateNotifications() {
        System.out.println("in notifiaction fn");
        LocalDate today = LocalDate.now();
       // LocalDate notifyDate = today.plusDays(1); // Notify bills due tomorrow

        List<Bill> billsDueTomorrow = billRepository.findByDueDate(today);

        for (Bill bill : billsDueTomorrow) {
            String recipientEmail = bill.getRegister().getEmail();
            String message = String.format(
                    "Hello, your bill '%s' (ID: %d) is due today on %s. Please ensure timely payment.",
                    bill.getBillName(),
                    bill.getId(),
                    bill.getDueDate().toString()
            );

            emailService.sendSimpleEmail(recipientEmail, "Bill Due Reminder", message);
        }
    }
}

