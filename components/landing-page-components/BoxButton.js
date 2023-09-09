import React from 'react';
import PropTypes from 'prop-types';

function BoxButton({ className, children, variant, ...rest }) {
  return (
    <button
      className={`font-display text-[1rem] transition md:text-[1.125rem]  focus:outline-none outline-none ${
        variant === 'outline' ? 'border-2 px-[0.875rem] py-3' : 'border-none p-[0.875rem]'
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
BoxButton.propTypes = {
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
};
export default BoxButton;
