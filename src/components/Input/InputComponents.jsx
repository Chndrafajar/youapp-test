import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

InputComponents.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'file']),
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  isFocused: PropTypes.bool,
};

export default function InputComponents({ type = 'text', name, value, isFocused, handleChange, placeholder, style }) {
  const input = useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <div className="input-text">
      <input type={type} name={name} value={value} ref={input} onChange={(e) => handleChange(e)} placeholder={placeholder} style={style} />
    </div>
  );
}
