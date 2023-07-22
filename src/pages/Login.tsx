import React, { useState, useContext, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === 'admin' && password === '123456') {
      login();
      navigate('/products'); // 使用useNavigate进行重定向
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:&nbsp;
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password: &nbsp;
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
}

export default Login;
