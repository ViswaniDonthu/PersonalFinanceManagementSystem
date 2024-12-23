package com.example.demo.Service;

import com.example.demo.Entity.Register;

public interface RegisterService {
    Register registerNewUser(Register register);
    Register loginUser(String email, String password);
    String getUsernameByRegisterId(long register_id);
    Boolean checkMailPresent(String mail);


}
