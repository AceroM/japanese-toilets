import React from 'react';
import PropTypes from 'prop-types';
import { ParallaxProvider } from 'react-scroll-parallax';

const Container = ({ children, scrollAxis, className }) => (
  <ParallaxProvider scrollAxis={scrollAxis}>
    <div className={scrollAxis}>
      <div className={className}>{children}</div>
    </div>
  </ParallaxProvider>
);

export default Container;

Container.propTypes = {
  children: PropTypes.func,
  scrollAxis: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Container.defaultProps = {
  children: <p />,
  className: '',
};
