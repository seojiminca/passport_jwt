//rsc
import React, {useState} from 'react';
import axios from 'axios';

const Register = () => {
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

    return (
        <div>
            <h1>Register</h1>
            <input placeholder="email"/>
            <input placeholder="name" />
            <input placeholder="password"/>
            <button>Submit</button>
        </div>
    );
};

export default Register;
