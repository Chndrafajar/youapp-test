import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import InputComponents from '../components/Input/InputComponents';
import InputPassword from '../components/Input/InputPassword';
import Button from '../components/Button/Button';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import axiosInstance from '../context/axiosInstance';
import swal from 'sweetalert';

export default function LoginPages() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post('/api/login', {
        email,
        username,
        password,
      });

      if (res.data.message === 'User has been logged in successfully') {
        swal('Good Job!', res.data.message, 'success');
        setAuth({
          ...auth,
          user: res.data.user,
          access_token: res.data.access_token,
        });
        localStorage.setItem(
          'auth',
          JSON.stringify({
            user: res.data.user,
            access_token: res.data.access_token,
          })
        );
        setLoading(false);
        navigate('/profile');
      } else {
        setLoading(false);
        swal('Miss!', res.data.message, 'error');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      swal('Miss!', 'Login error', 'error');
    }
  };

  return (
    <section className="auth-pages">
      <div className="container">
        <div className="header">
          <FaChevronLeft /> <span>Back</span>
        </div>
        <div className="items-auth">
          <div className="card-auth">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <InputComponents placeholder="Enter Username/Email" type="email" style={{ marginBottom: '12px', width: '100%' }} value={email} handleChange={(e) => setEmail(e.target.value)} />
              <InputPassword placeholder="Enter Password" style={{ width: '100%' }} value={password} handleChange={(e) => setPassword(e.target.value)} type="password" />
              {loading ? (
                <Button type="submit" style={{ marginTop: '30px', width: '100%' }}>
                  Loading...
                </Button>
              ) : (
                <Button type="submit" style={{ marginTop: '30px', width: '100%' }}>
                  Login
                </Button>
              )}
            </form>
            <div className="what-account">
              No account?{' '}
              <NavLink to="/register" className="link">
                Register here
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
