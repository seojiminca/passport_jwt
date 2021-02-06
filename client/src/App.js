import React from 'react';
import { Link } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <div>
                <h1>Home</h1>
                <Link to={'/register'}>
                    <span>Register</span>
                </Link>
                <Link to={'/signin'}>
                    <span>Sign in</span>
                </Link>
            </div>
        </div>
    );
}

export default App;
