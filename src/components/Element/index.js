import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default function Element({ name, children }) {
  return (
    <div className="ratio">
      <div className="inner">
        <div className="box">
          {name}
        </div>
        {children}
      </div>
    </div>
  );
}

Element.propTypes = {
  name: PropTypes.string,
  children: PropTypes.func,
};

Element.defaultProps = {
  name: '',
  children: <p />,
};
