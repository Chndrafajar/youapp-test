import React, { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import thumbnail_image from '../../assets/thumbnail_image.png';
import { useAuth } from '../../context/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import { IoClose } from 'react-icons/io5';

export default function ProfilePages() {
  const [auth, setAuth] = useAuth();
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

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      access_token: '',
    });
    navigate('/');
    localStorage.removeItem('auth');
    swal('Good Job!', 'Logout successfully', 'success');
  };

  const getTanggal = (datetime) => {
    if (datetime) {
      const datePart = datetime.split('T')[0];
      const [year, month, day] = datePart.split('-');
      return day;
    }
    return '';
  };

  const getFormattedBirthday = (birthday) => {
    if (birthday) {
      const [year, month, day] = birthday.split('-');

      const age = new Date().getFullYear() - parseInt(year, 10);

      const formattedDate = `${day}/${month}/${year}`;

      return `${formattedDate} (Age ${age})`;
    }
    return '';
  };

  return (
    <>
      <section className="profile-pages">
        <div className="container">
          <div className="header">
            <div className="btn-back">
              <FaChevronLeft /> <span>Back</span>
            </div>
            <div className="dropdown">
              <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <h5>{profileData?.username}</h5>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="card">
            <img src={thumbnail_image} alt="" />
            <div className="info-profile-user">
              <div className="items-profile">
                <h5>
                  {profileData?.username}
                  {profileData?.birthday ? `, ${getTanggal(profileData?.birthday)}` : ''}
                </h5>
                <h6>{profileData?.gender}</h6>
                <div className="info-profile-zodiac">
                  {profileData?.horoscope && (
                    <div className="info-zodiac-item">
                      <img src="/images/icons/virgo.svg" alt="" />
                      <span>{profileData.horoscope}</span>
                    </div>
                  )}
                  {profileData?.zodiac && (
                    <div className="info-zodiac-item">
                      <img src="/images/icons/pig.svg" alt="" />
                      <span>{profileData?.zodiac}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="card-about">
            <div className="header-about">
              <h4>About</h4>
              <NavLink to={profileData?.name ? '/update-profile-about' : '/create-profile-about'}>
                <img src="/images/icons/pen.svg" alt="" />
              </NavLink>
            </div>
            <ul className="info-about">
              <li>
                <h6>
                  <span>Birthday: </span>
                  {getFormattedBirthday(profileData?.birthday)}
                </h6>
              </li>
              <li>
                <h6>
                  <span>Horoscope: </span>
                  {profileData?.horoscope}
                </h6>
              </li>
              <li>
                <h6>
                  <span>Zodiac: </span>
                  {profileData?.zodiac}
                </h6>
              </li>
              <li>
                <h6>
                  <span>Height: </span>
                  {profileData?.height} cm
                </h6>
              </li>
              <li>
                <h6>
                  <span>Weight: </span>
                  {profileData?.weight} kg
                </h6>
              </li>
            </ul>
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
    </>
  );
}
