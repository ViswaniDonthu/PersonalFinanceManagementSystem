package com.example.demo.controller;
import com.example.demo.Entity.Register;
import com.example.demo.Service.EmailService;
import com.example.demo.Service.PasswordResetService;
import org.springframework.web.bind.annotation.*;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/password-reset")
public class PasswordResetController {

    private final EmailService emailService;
    private final PasswordResetService passwordResetService;

    public PasswordResetController(EmailService emailService, PasswordResetService passwordResetService) {
        this.emailService = emailService;
        this.passwordResetService = passwordResetService;
    }

    // Endpoint to request password reset (send reset email)
    @PostMapping("/request")
    public String requestPasswordReset(@RequestParam("email") String email) {
        String token = passwordResetService.generateResetToken(email);
        if (token != null) {
            String resetLink = "http://localhost:5173/password-reset/form?token=" + token;
            try {
                emailService.sendPasswordResetEmail(email, resetLink);
                return "Password reset email sent successfully.";
            } catch (MessagingException e) {
                return "Failed to send reset email: " + e.getMessage();
            }
        }
        return "No user found with that email address.";
    }

    // Endpoint to display the reset form (user enters a new password)
    @GetMapping("/form")
    public String showResetForm(@RequestParam("token") String token) {
        Register user = passwordResetService.validateResetToken(token);
        if (user != null) {
            return "Please enter your new password for the email: " + user.getEmail();
        }
        return "Invalid or expired token.";
    }

    // Endpoint to reset password (user submits a new password)
    @PostMapping("/reset")
    public String resetPassword(@RequestParam("token") String token, @RequestParam("newPassword") String newPassword) {
      System.out.println("in resetPassword");
        Register user = passwordResetService.validateResetToken(token);
        if (user != null) {
            passwordResetService.resetPassword(user, newPassword);
            return "Your password has been reset successfully.";
        }
        return "Invalid or expired token.";
    }
}
