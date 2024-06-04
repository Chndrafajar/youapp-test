import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axiosInstance from '../../context/axiosInstance'; // pastikan jalur impor benar
import { useAuth } from '../../context/auth';

export default function ProfileInterest() {
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    height: '',
    weight: '',
    interests: [],
  });

  const [auth] = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = auth.access_token;

    // Konversi height dan weight ke angka
    const dataToSubmit = {
      ...formData,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      interests: categories, // tambahkan categories ke interests
    };

    const config = {
      headers: {
        'x-access-token': `${token}`,
      },
    };

    axiosInstance
      .post('/api/createProfile', dataToSubmit, config)
      .then((response) => {
        console.log('Data submitted successfully:', response.data);
        swal('Success!', response.data.message, 'success');
        navigate('/profile');
      })
      .catch((error) => {
        swal('Error!', error.response.data.message, 'error');
        console.error('Error submitting data:', error);
      });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddCategory = () => {
    if (inputValue.trim() !== '') {
      setCategories([...categories, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCategory();
    }
  };

  const handleRemoveCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <section className="profile-interest">
      <div className="container">
        <div className="header">
          <div className="btn-back">
            <FaChevronLeft /> <span>Back</span>
          </div>
          <div className="save-btn" onClick={handleSubmit}>
            Save
          </div>
        </div>
        <h5>Tell everyone about yourself</h5>
        <h3>What interests you?</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-interest-category">
            <ul>
              {categories.map((category, index) => (
                <li key={index}>
                  <span>{category}</span>
                  <button type="button" onClick={() => handleRemoveCategory(index)}>
                    <IoClose />
                  </button>
                </li>
              ))}
            </ul>
            <input type="text" className="input-interest" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
          </div>
          <div className="input-about">
            <label>Display name:</label>
            <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="input-about">
            <label>Gender:</label>
            <select name="gender" onChange={handleChange} value={formData.gender}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="input-about">
            <label>Birthday:</label>
            <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
          </div>
          <div className="input-about">
            <label>Horoscope:</label>
            <input type="text" name="horoscope" placeholder="--" value={formData.horoscope} onChange={handleChange} />
          </div>
          <div className="input-about">
            <label>Zodiac:</label>
            <input type="text" name="zodiac" placeholder="--" value={formData.zodiac} onChange={handleChange} />
          </div>
          <div className="input-about">
            <label>Height:</label>
            <input type="number" name="height" placeholder="Add Height" value={formData.height} onChange={handleChange} />
          </div>
          <div className="input-about">
            <label>Weight:</label>
            <input type="number" name="weight" placeholder="Add Weight" value={formData.weight} onChange={handleChange} />
          </div>
        </form>
      </div>
    </section>
  );
}
