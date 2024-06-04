import React, { useEffect, useRef, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';

InputPassword.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  isFocused: PropTypes.bool,
};

export default function InputPassword({ name, value, isFocused, handleChange, placeholder, style }) {
  const input = useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-password">
      <input type={showPassword ? 'text' : 'password'} name={name} value={value} ref={input} onChange={(e) => handleChange(e)} placeholder={placeholder} style={style} />
      <div className="icons" onClick={togglePasswordVisibility}>
        {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
      </div>
    </div>
  );
}
