package com.example.demo.Service;
import com.example.demo.Entity.Register;
import com.example.demo.repo.RegisterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service public class RegisterServiceImp implements RegisterService {
    @Autowired
    RegisterRepo repo;
    @Autowired
    private RegisterRepo registerRepo;

    @Override
    public Register registerNewUser(Register register) {
        return repo.save(register);
    }
    @Override
    public Register loginUser(String email, String password) {
        System.out.println(email+password);
        Register user = repo.findByEmailAndPassword(email,password);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        } // Returning null or throw an exception if authentication fails
        throw new RuntimeException("Invalid username or password"); }

    @Override
    public String getUsernameByRegisterId(long register_id) {
        Register register = repo.findById(register_id);
        if (register == null) {
            throw new RuntimeException("User not found for register ID: " + register_id);
        }
        return register.getUsername();
    }
    @Override

    public Boolean checkMailPresent(String mail) {
  System.out.println(mail);
  mail=mail.trim().toLowerCase();
        Optional<Register> user = repo.findByEmail(mail);
        if (user.isEmpty()) {
            System.out.println("User not found for email: " + mail);
            return false;  // Email is not present
        }
        return true;  // Email is present
    }



}




