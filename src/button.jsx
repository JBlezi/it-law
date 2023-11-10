import React from 'react';
import { Link } from "react-router-dom";

const Button = (props) => {
  const color = props.color;
  const link = props.link;
  const text = props.text;
  const buttonClasses = `rounded-lg p-4 text-white ${color === 'main' ? 'bg-main' : 'bg-grey'}`;


  return (
    <Link path to={link}>
      <button className={buttonClasses}>
          {text}
      </button>
    </Link>
  );
};

export default Button;
