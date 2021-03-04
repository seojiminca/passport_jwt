import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { isAuth } from '../helpers/auth';
import { Redirect } from 'react-router-dom';

const Signin = ({match}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        token:'',
        textChange: 'Sign in',
        show: true
    });

    useEffect(() => {
        let token = match.params.token;
        let { email } = jwt.decode(token);

        if (token) {
            setFormData({ ...formData, email, password, token, textChange });
        }

        console.log(token, email);
    }, [match.params]);

    const {email, password, token, textChange} = formData;

    const handleChange = text => e => {
        setFormData({...formData, [text]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(email && password) {
            setFormData({...formData, textChange: 'Submitting'});
            axios
                .post('http://localhost:5000/users/signin', {
                    token
                })
                .then(res => {
                    setFormData({
                        ...formData,
                        show: false
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
