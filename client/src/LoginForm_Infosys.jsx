 const LoginFormInfo= () => {
     return (
       <div className="login-form">
         <label htmlFor="username">User Name:</label>
         <input type="text" id="username" />

         <label htmlFor="password">Password:</label>
         <input type="password" id="password" />

         <button type="submit">Login</button>
       </div>
     );
   };

   export default LoginFormInfo;
   