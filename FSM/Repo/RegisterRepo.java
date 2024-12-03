package com.example.demo.repo;

import com.example.demo.Entity.Register;


import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegisterRepo extends JpaRepository<Register, Integer> {

 Register findByEmailAndPassword(String email, String password);
 Register findById(long register_id);

 Optional<Register> findByEmail(String email);
 Optional<Register> findByResetToken(String resetToken);
 @Modifying
 @Transactional
 @Query("UPDATE Register u SET u.password = :newPassword WHERE u.email = :email")
 void updatePasswordByEmail(@Param("email") String email, @Param("newPassword") String newPassword);
}