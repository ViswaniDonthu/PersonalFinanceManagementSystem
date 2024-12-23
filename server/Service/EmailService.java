package com.example.demo.Service;

import com.example.demo.Entity.Bill;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final LocalDateTime scheduledTime = LocalDateTime.of(2024, 12, 12, 0, 44);
    @Value("${spring.mail.username}")
    private String senderEmail;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    // Method to send a simple email
    public void sendSimpleEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail);  // Make sure your email ID is correct
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        // Send the email
        javaMailSender.send(message);
        System.out.println("email sent to: " + to);
    }
    public void sendPasswordResetEmail(String toEmail, String resetLink) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom("donthuviswani@gmail.com");
        helper.setTo(toEmail);
        helper.setSubject("Password Reset Request");
        String body = "<p>Click the following link to reset your password:</p>"
                + "<a href=\"" + resetLink + "\">Reset Password</a>";
        helper.setText(body, true);
        javaMailSender.send(mimeMessage);
    }

    }

