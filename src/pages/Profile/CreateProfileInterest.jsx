import React, { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axiosInstance from '../../config/axiosInstance';
import swal from 'sweetalert';

export default function CreateProfileInterest() {
  const [interest, setInterest] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const [auth] = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = auth.access_token;
        const config = {
          headers: {
            'x-access-token': token,
          },
        };

        const response = await axiosInstance.get('/api/getProfile', config);
        setProfileData(response.data.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [auth]);

  useEffect(() => {
    const fetchInterests = async () => {
      const token = auth.access_token;

      const config = {
        headers: {
          'x-access-token': `${token}`,
        },
      };

      try {
        const response = await axiosInstance.get('/api/getProfile', config);
        if (response.data.interests) {
          setInterest(response.data.interests);
        }
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };

    fetchInterests();
  }, [auth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = auth.access_token;

    const dataToSubmit = {
      interests: interest,
      birthday: profileData?.birthday,
    };

    const config = {
      headers: {
        'x-access-token': `${token}`,
      },
    };

    axiosInstance
      .put('/api/updateProfile', dataToSubmit, config)
      .then((response) => {
        console.log('Data submitted successfully:', response.data);
        swal('Success!', response.data.message, 'success');
        navigate('/profile');
        setLoading(false);
      })
      .catch((error) => {
        swal('Error!', error.message || 'Error submitting data', 'error');
        console.error('Error submitting data:', error);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddInterest = () => {
    if (inputValue.trim() !== '') {
      setInterest([...interest, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddInterest();
    }
  };

  const handleRemoveInterest = (index) => {
    setInterest(interest.filter((_, i) => i !== index));
  };

  return (
    <section className="profile-interest">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="header">
            <NavLink to="/profile" className="btn-back link">
              <FaChevronLeft /> <span>Back</span>
            </NavLink>
            <button type="submit" className="save-btn">
              {loading ? 'Loading...' : 'Save'}
            </button>
          </div>
          <h5>Tell everyone about yourself</h5>
          <h3>What interests you?</h3>
          <div className="input-interest-category">
            <ul>
              {interest?.map((i, index) => (
                <li key={index}>
                  <span>{i}</span>
                  <button type="button" onClick={() => handleRemoveInterest(index)}>
                    <IoClose />
                  </button>
                </li>
              ))}
            </ul>
            <input type="text" className="input-interest" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
          </div>
        </form>
      </div>
    </section>
  );
}
