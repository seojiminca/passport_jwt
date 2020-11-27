import React, {useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const App = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    textChange: 'Sign Up'
  });

  return (
      <div className="App">
        <div>
          <h1>Register</h1>
        </div>
      </div>
  );
}

export default App;
