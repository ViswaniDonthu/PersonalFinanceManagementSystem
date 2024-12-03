import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  // Use `useNavigate` instead of `useHistory`

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState('');
  const location = useLocation();
  const navigate = useNavigate();  // useNavigate hook for navigation in React Router v6

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setErrorMessage('Invalid or missing token');
    }
  }, [location]);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setErrorMessage('Password is required.');
      return;
    }

    try {
      // Send the token and new password to the backend
      const response = await fetch('http://localhost:9000/password-reset/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          token: token,
          newPassword: newPassword,
        }),
      });

      const result = await response.text();

      if (response.ok) {
        setSuccessMessage('Your password has been reset successfully.');
        setTimeout(() => {
          navigate('/login'); 
        }, 2000);
      } else {
        setErrorMessage(result);
      }
    } catch (error) {
      setErrorMessage('An error occurred while resetting your password.');
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" style={{"backgroundColor":"blue","padding":"10px","border":"2px solid black","borderRadius":"10px"}}>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
