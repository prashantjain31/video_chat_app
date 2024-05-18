import React, { useState } from "react";
import * as Components from './Components';
import {Link, useNavigate} from "react-router-dom";
import { axiosInstance } from './api';

const Login = () => {
    const [signIn, toggle] = React.useState(true);
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/login', {
        username,
        password,
      });

      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Handle error message
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post('/register', {
        username,
        password,
      });

      // Optionally, you can automatically log in the user after successful registration
      // const response = await axiosInstance.post('/login', {
      //   username,
      //   password,
      // });
      // const { access_token } = response.data;
      // localStorage.setItem('access_token', access_token);
      // navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      // Handle error message
    }
  };

    return(
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form onSubmit={handleSignup}>
                    <Components.Title>Create Account</Components.Title>
                   
                    <Components.Input
                        type="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Components.Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" style={{
                         borderRadius: "20px",
                         border: "1px solid #ff4b2b",
                         backgroundColor: "#ff4b2b",
                         color: "#ffffff",
                         fontSize: "12px",
                         fontWeight: "bold",
                         padding: "12px 45px",
                         letterSpacing: "1px",
                         textTransform: "uppercase",
                         transition: "transform 80ms ease-in",
                         cursor: "pointer",
                         "&:active": {
                             transform: "scale(0.95)"
                         }
                      
                        
                     }} 
                    
                     onClick={()=>{toggle(true)}}
                     
                    >
                    Sign Up
                    </button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                 <Components.Form onSubmit={handleLogin}>
                    <Components.Title>Sign in</Components.Title>
                    <Components.Input 
                        type='username' 
                        placeholder='Username' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Components.Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <button type="submit" style={{
                        borderRadius: "20px",
                        border: "1px solid #ff4b2b",
                        backgroundColor: "#ff4b2b",
                        color: "#ffffff",
                        fontSize: "12px",
                        fontWeight: "bold",
                        padding: "12px 45px",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        transition: "transform 80ms ease-in",
                        cursor: "pointer",
                        "&:active": {
                            transform: "scale(0.95)"
                        }
                        
                    }}>
                        Sign In
                    </button>
                 </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>

                <Components.LeftOverlayPanel signinIn={signIn}>
                    <Components.Title>Welcome Back!</Components.Title>
                    <Components.Paragraph>
                        To keep connected with us please login with your info
                    </Components.Paragraph>
                    <Link style={{
                         borderRadius: "20px",
                         border: "1px solid #ff4b2b",
                         backgroundColor: "#ff4b2b",
                         color: "#ffffff",
                         fontSize: "12px",
                         fontWeight: "bold",
                         padding: "12px 45px",
                         letterSpacing: "1px",
                         textTransform: "uppercase",
                         transition: "transform 80ms ease-in",
                         "&:active": {
                             transform: "scale(0.95)"
                         }
                      
                        
                     }} 
                    
                     onClick={()=>{toggle(true)}}
                     
                    >
                     Sign In
                     </Link>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                      <Components.Title>Hello, Friend!</Components.Title>
                      <Components.Paragraph>
                          Enter Your details and start your journey with us
                      </Components.Paragraph>
                      <Link style={{
                         borderRadius: "20px",
                         border: "1px solid #ff4b2b",
                         backgroundColor: "#ff4b2b",
                         color: "#ffffff",
                         fontSize: "12px",
                         fontWeight: "bold",
                         padding: "12px 45px",
                         letterSpacing: "1px",
                         textTransform: "uppercase",
                         transition: "transform 80ms ease-in",
                         "&:active": {
                             transform: "scale(0.95)"
                         }
                      
                        
                     }} 
                    
                     onClick={()=>{toggle(false)}}
                     
                    >
                        Sign Up
                     </Link>
                    </Components.RightOverlayPanel>

                </Components.Overlay>
            </Components.OverlayContainer>

        </Components.Container>
    );
}

export default Login;
