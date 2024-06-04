import React from 'react';
import PropTypes from 'prop-types';

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,

  processing: PropTypes.bool,
  children: PropTypes.node,
};

export default function Button({ type = 'submit', className = '', variant = 'primary', processing, children, style }) {
  return (
    <button type={type} className="button-primary" disabled={processing} style={style}>
      {children}
    </button>
  );
}
