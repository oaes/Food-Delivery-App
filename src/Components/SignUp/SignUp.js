import React,{useState} from 'react';
import './SignUp.css';
import { useForm } from 'react-hook-form';
import Logo from '../../Images/logo2.png';
import {Link} from 'react-router-dom';
import { useAuth } from './useAuth';


const SignUp = () => {
    const [returningUser , setReturningUser] = useState(false);
    const { register, handleSubmit, watch, errors } = useForm();

    const auth = useAuth();
    const onSubmit = data => { 
        if(returningUser){
            if(data.email && data.password){
                auth.signIn(data.email, data.password);
            }
        }else{
            if(data.name && data.email && data.password && data.confirm_password){
                auth.signUp(data.email, data.confirm_password,data.name)
            }
        }
        
     }
     console.log(auth);
     

    return (
        <div className="sign-up">
            <div className="container">
                <div className="logo text-center py-4">
                    <Link to="/">
                         <img src={Logo} alt=""/>
                    </Link>
                </div>
                {
                returningUser ? 
                <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                   
                    <div className="form-group">
                        <input name="email" className="form-control" ref={register({ required: true })} placeholder="Email"/>
                        {errors.email && <span className="error">Email is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control" ref={register({ required: true })} placeholder="Password" />
                        {errors.password && <span className="error">Password is required</span>}
                    </div>
                    
                    <div className="form-group">
                        <button className="btn btn-danger btn-block" type="submit">Sign In</button>
                    </div>
                    <div className="option text-center">
                        <label  onClick={() => setReturningUser(false)}>Create a new Account</label>
                    </div>
                </form>
                :
                <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                    <div className="form-group">
                        <input name="name" className="form-control" ref={register({ required: true })} placeholder="Name" />
                        {errors.name && <span className="error">Name is required</span>}
                    </div>
                    <div className="form-group">
                        <input name="email" className="form-control" ref={register({ required: true })} placeholder="Email"/>
                        {errors.email && <span className="error">Email is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control" ref={register({ required: true })} placeholder="Password" />
                        {errors.password && <span className="error">Password is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" name="confirm_password" className="form-control" ref={register({
                        validate: (value) => value === watch('password')
                        })} placeholder="Confirm Password" />
                        {errors.confirm_password && <span className="error">Passwords don't match.</span>}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-danger btn-block"  type="submit">Sign Up</button>
                    </div>
                    <div className="option text-center">
                        <label onClick={() => setReturningUser(true)}>Already Have an Account</label>
                    </div>
                </form>

                }
               
            </div>

        </div>
    );
};

export default SignUp;