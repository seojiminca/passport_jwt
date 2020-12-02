//rsc
import React, {useState} from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        textChange: 'Register'
    });

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
