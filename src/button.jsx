import React from 'react';
import { Link } from "react-router-dom";

const Button = (props) => {
  const color = props.color;
  const link = props.link;
  const text = props.text;
  const buttonClasses = `rounded-lg p-4 ${color === 'main' ? 'bg-main text-white dark:text-light' : 'bg-grey dark:bg-light dark:text-grey'}`;


  return (
    <Link to={link}>
      <button className={buttonClasses}>
          {text}
      </button>
    </Link>
  );
};

export default Button;
