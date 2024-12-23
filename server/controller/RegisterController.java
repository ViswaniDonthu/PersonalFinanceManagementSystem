package com.example.demo.controller;

import com.example.demo.Entity.Register;
import com.example.demo.Service.RegisterServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class RegisterController {

    @Autowired
    private RegisterServiceImp service;


@PostMapping("/save")
public ResponseEntity<?> addNewUser(@RequestBody Register register) {
    System.out.println(register.getPassword());
    Register addUser = service.registerNewUser(register);
    System.out.println(register);

    if (addUser != null) {
        // Return success message with a status
        return ResponseEntity.ok(Map.of("message", "New User has been successfully registered."));
    } else {
        // Return failure message with a status
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "Registration failed."));
    }
}
@GetMapping("/getUserName/{register_id}")
public String getUserName(@PathVariable long register_id) {
    return service.getUsernameByRegisterId(register_id);
}


@PostMapping("/emailcheck")
public ResponseEntity<?> checkEmail(@RequestBody Map<String, String> payload) {
    // Get the email from the incoming request
    String email = payload.get("email");
    System.out.println("Email being checked: " + email);

    // Call the service to check if the email exists
    Boolean present = service.checkMailPresent(email);

    return ResponseEntity.ok(Map.of("present", present));
}


    @PostMapping("/log")
    public ResponseEntity<?> login(@RequestBody Register loginData) {
        String email = loginData.getEmail();
        String password = loginData.getPassword();
        Register loginObj = service.loginUser(email, password);
        long id=loginObj.getId();
        System.out.println(loginObj+"id is"+id);

        if (loginObj != null) {
            // Send success response with a token (example token)
            return ResponseEntity.ok(Map.of("register_id",id, "message", "You Logged in Successfully"));
        } else {
            // Send failure response

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Please insert valid username and password."));
        }
    }
}


