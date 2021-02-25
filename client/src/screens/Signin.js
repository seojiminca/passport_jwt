import React, {useState} from 'react';
import axios from 'axios';
import { isAuth } from '../helpers/auth';
import { Redirect } from 'react-router-dom';

const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        textChange: 'Sign in'
    });

    const {email, password, textChange} = formData;

    const handleChange = text => e => {
        setFormData({...formData, [text]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(email && password) {
            setFormData({...formData, textChange: 'Submitting'});
            axios
                .post('http://localhost:5000/users/signin', {
                    email,
                    password,
                    textChange: 'Submitting'
                })
                .then(res => {
                    setFormData({
                        email: '',
                        password: '',
                        textChange: 'Submitted'
                    })
                })
        }else{
            console.log('Please enter your email and password')
        }
    }
    return (
        <div>
            {isAuth() ? <Redirect to='/' /> : null}
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="email"
                       type='email'
                       value={email}
                       onChange={handleChange('email')}/>
                <input placeholder="password"
                       type='password'
                       value={password}
                       onChange={handleChange('password')}/>
                <button type='submit'>
                    <span>{textChange}</span>
                </button>
            </form>
        </div>
    );
};

export default Signin;
