//rsc
import React, {useState} from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        textChange: 'Sign in'
    });

    return (
        <div className="App">
            <div>
                <h1>Sign in</h1>
            </div>
        </div>
    );
};

export default Register;
