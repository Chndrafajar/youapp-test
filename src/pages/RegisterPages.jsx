import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import InputComponents from '../components/Input/InputComponents';
import InputPassword from '../components/Input/InputPassword';
import Button from '../components/Button/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosInstance from '../context/axiosInstance';

export default function RegisterPages() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPassword_confirm] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== password_confirm) {
      swal('Gagal!', 'Passwords do not match', 'error');
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post('/api/register', {
        email,
        username,
        password,
      });
      if (res.data.message === 'User has been created successfully') {
        setLoading(false);
        swal('Good Job!', res.data.message, 'success');
        navigate('/');
      } else {
        setLoading(false);
        swal('Miss!', res.data.message, 'error');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      swal('Miss!', 'Registrasi error', 'error');
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
            <h2>Register</h2>
            <form action="" onSubmit={handleSubmit}>
              <InputComponents placeholder="Enter Email" type="email" style={{ marginBottom: '12px', width: '100%' }} value={email} handleChange={(e) => setEmail(e.target.value)} />
              <InputComponents placeholder="Create Username" type="text" style={{ marginBottom: '12px', width: '100%' }} value={username} handleChange={(e) => setUsername(e.target.value)} />
              <div style={{ marginBottom: '12px' }}>
                <InputPassword placeholder="Create Password" style={{ width: '100%' }} value={password} handleChange={(e) => setPassword(e.target.value)} />
              </div>
              <InputPassword placeholder="Confirm Password" style={{ width: '100%' }} value={password_confirm} handleChange={(e) => setPassword_confirm(e.target.value)} />

              <Button type="submit" style={{ marginTop: '30px', width: '100%' }}>
                {loading ? 'Loading...' : 'Register'}
              </Button>
            </form>
            <div className="what-account">
              Have an account?{' '}
              <NavLink to="/" className="link">
                Login here
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
