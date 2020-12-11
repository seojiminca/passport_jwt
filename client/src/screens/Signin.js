import React, {useState} from 'react';
import axios from 'axios';

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
                    password
                })
                .then(res => {
                    setFormData({
                        email: '',
                        password: ''
                    })
                })
        }else{
            console.log('Please enter your email and password')
        }
    }
    return (
        <div>
            <h1>Sign in</h1>
            <input placeholder="email" />
            <input placeholder="password" />
            <button>Submit</button>
        </div>
    );
};

export default Signin;
