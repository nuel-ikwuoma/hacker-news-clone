import React from 'react'

// BUTTON COMPONENT
const Button = ({ onClick, className = "", children }) =>
  <button type="button" className={className} onClick={onClick}>
    {children}
  </button>

export default Button;