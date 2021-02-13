//rsc
import React, {useState} from 'react';
import axios from 'axios';

const Register = () => {
    //현재값, 업데이트값
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        textChange: 'Register'
    });

    const {email, name, password, textChange} = formData; //const name = formData.name

    const handleChange = text => e => {//값이 들어오면 form 바뀐다. text:사용자입력값 e:each value
        setFormData({...formData, [text]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (email && name && password) {
            setFormData({...formData, textChange: 'Submitting'});

            axios
                .post('http://localhost:5000/users/register', {
                    email,
                    name,
                    password
                })
                .then(res => {
                    setFormData({
                        email: '',
                        name: '',
                        password: '',
                        textChange: 'Submitting'
                    });
                })
                .catch(err => {
                    setFormData({
                        email: '',
                        name: '',
                        password: '',
                        textChange: 'Submitted'
                    });
                })
        } else {
            console.log('Please fill out the form')
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="email"
                       type='email'
                       value={email}
                       onChange={handleChange('email')}/>
                <input placeholder="name"
                       type='text'
                       value={name}
                       onChange={handleChange('name')}/>
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

export default Register;
