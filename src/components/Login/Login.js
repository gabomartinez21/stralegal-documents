import { Component, Fragment } from "react";
import logo from '../../Assets/Images/logo_startLegal.png'
import './Login.css';

class Login extends Component{
    render(){
        return(
            <Fragment>
                <div class="login-admin container-fluid">
                    <div class="row align-items-stretch">
                        <div class="col bg d-none d-md-block">
                        
                        </div>
                        <div class="col d-flex justify-content-center align-items-center">            
                        <div class="d-sm-flex flex-sm-column justify-content-sm-center align-items-sm-center d-md-block">
                            <div class="py-5 d-flex justify-content-center d-lg-block">
                                <img class="logo_startLegal" src={logo} alt="" />
                            </div>
                            
                            {/* <!-- LOGIN --> */}
                            
                            <form action="#">
                            <div class="mb-4">
                                <div class="input-wrapper">
                                    <input type="text" class="email" name="email" placeholder="Usuario" />
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                            <div class="mb-4 ">
                                <div class="input-wrapper">
                                    <input type="password" class="password"  name="password" placeholder="Contraseña" />
                                    <i class="fas fa-lock"></i>
                                </div>
                            </div>
                            <div class="mb-4 ">
                                <button type="submit" class="login-admin-btn login-admin-btn--blue">ACCEDER</button>
                                </div>
                            <div class="my-3">
                                <span><a class="login-admin__link" href="/#">Olvidaste tu contraseña?</a></span>
                            </div>
                            </form>
                        </div>
                        
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Login;