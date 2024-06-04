import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaPlus } from 'react-icons/fa6';
import thumbnail_image from '../../assets/thumbnail_image.png';
import axiosInstance from '../../context/axiosInstance';
import { useAuth } from '../../context/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function CreateProfileAbout() {
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    height: '',
    weight: '',
    interests: [],
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); //
    }
  };
  const [profileData, setProfileData] = useState(null);

  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const token = auth.access_token;

    const dataToSubmit = {
      ...formData,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
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
        setLoading(false);
        swal('Success!', response.data.message, 'success');
        navigate('/profile');
      })
      .catch((error) => {
        setLoading(false);
        swal('Success!', error, 'success');
        console.error('Error submitting data:', error);
      });
  };

  //get profile
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

  const getTanggal = (datetime) => {
    if (datetime) {
      return datetime.split('T')[0];
    }
    return '';
  };

  return (
    <section className="profile-about">
      <div className="container">
        <div className="header">
          <NavLink to="/profile" className="btn-back link">
            <FaChevronLeft /> <span>Back</span>
          </NavLink>
          <NavLink className="head5" to="/profile">
            {profileData?.username}
          </NavLink>
        </div>
        <div className="card">
          {selectedImage ? (
            <>
              <img src={selectedImage} alt="" />
              <div className="info-profile-user">
                <div className="items-profile">
                  <h5>{profileData?.username}</h5>
                </div>
              </div>
            </>
          ) : (
            <>
              <img src={thumbnail_image} alt="" />
              <div className="info-profile-user-thumbnail">
                <div className="items-profile">
                  <h5>{profileData?.username}</h5>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="card-edit-about">
          <form action="" onSubmit={handleSubmit}>
            <div className="header-edit-about">
              <h4>About</h4>
              <button type="submit" className="btn-save">
                {loading ? 'Loading...' : 'Save & Update'}
              </button>
            </div>
            <div className="btn-add-image">
              <div className="btn-image">
                {selectedImage ? (
                  <div className="preview">
                    <input type="file" onChange={handleImageChange} accept="image/*" className="input-image" />
                    <img src={selectedImage} alt="Preview" />
                  </div>
                ) : (
                  <div className="btn-add">
                    <input type="file" onChange={handleImageChange} accept="image/*" className="input-image" />
                    <img src="/images/icons/plus.svg" alt="Tambah Gambar" />
                  </div>
                )}
              </div>
              <h6>Add Image</h6>
            </div>
            <div className="input-about">
              <label>Display name:</label>
              <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} />
            </div>
            {/* <div className="input-about">
              <label>Gender:</label>
              <select name="gender" onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div> */}
            <div className="input-about">
              <label>Birthday:</label>
              <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
            </div>
            <div className="input-about">
              <label>Horoscope:</label>
              <input type="text" name="horoscope" placeholder="--" value={formData.horoscope} onChange={handleChange} disabled />
            </div>
            <div className="input-about">
              <label>Zodiac:</label>
              <input type="text" name="zodiac" placeholder="--" value={formData.zodiac} onChange={handleChange} disabled />
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
        <div className="card-interest">
          <div className="header-interest">
            <h4>Interest</h4>
            <NavLink to={profileData?.name ? '/create-profile-interest' : '/create-profile-about'}>
              <img src="/images/icons/pen.svg" alt="" />
            </NavLink>
          </div>
          {profileData?.interests && profileData.interests.length > 0 ? (
            <ul className="profile-interests-card">
              {profileData.interests.map((i, index) => (
                <li key={index}>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          ) : (
            <h5>Add in your interest to find a better match</h5>
          )}
        </div>
      </div>
    </section>
  );
}
