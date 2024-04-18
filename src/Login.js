import React from "react";
import * as Components from './Components';
import {Link} from "react-router-dom";

const Login = () => {
    const [signIn, toggle] = React.useState(true);
    return(
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' placeholder='Name' />
                    <Components.Input type='email' placeholder='Email' />
                    <Components.Input type='password' placeholder='Password' />
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
                    Sign Up
                     </Link>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                 <Components.Form>
                     <Components.Title>Sign in</Components.Title>
                     <Components.Input type='email' placeholder='Email' />
                     <Components.Input type='password' placeholder='Password' />
                     <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
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
                        
                     }} to="/dashboard">
                        Sign In
                     </Link>
                 </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>

                <Components.LeftOverlayPanel signinIn={signIn}>
                    <Components.Title>Welcome Back!</Components.Title>
                    <Components.Paragraph>
                        To keep connected with us please login with your personal info
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
                          Enter Your personal details and start journey with us
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
