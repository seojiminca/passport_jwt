import React, {useState} from 'react';

const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        textChange: 'Sign in'
    });

    return (
        <div>
            <h1>Sign in</h1>
            <input placeholder="email" />
            <input placeholder="name" />
            <input placeholder="password" />
            <button>Submit</button>
        </div>
    );
};

export default Signin;
