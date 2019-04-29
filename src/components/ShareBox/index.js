import React from 'react';

import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

const CommentButton = () => (
  <a
    className="share-button"
    style={{
      lineHeight: '1.7rem',
      color: '#337ab7',
      paddingLeft: '0.15rem',
    }}
    href="#gitalk-container"
    onClick={() => ReactGA.event({
      category: 'User',
      action: 'Goto Comment Box',
    })
    }
  >
    <FontAwesomeIcon icon={['far', 'comment']} />
  </a>
);

const ShareBox = ({ hasCommentBox }) => (
  <div className="m-share-box">
    {/* 視覺置中 => 稍微往上偏移 */}
    {hasCommentBox && <CommentButton />}

    <a
      className="share-button"
      href="#header"
      onClick={() => {
        ReactGA.event({
          category: 'User',
          action: 'Scroll to Top',
        });
      }}
      style={{
        lineHeight: '1.7rem',
        paddingLeft: '0.1rem',
      }}
    >
      <FontAwesomeIcon icon={['fas', 'chevron-up']} />
    </a>
  </div>
);

ShareBox.propTypes = {
  hasCommentBox: PropTypes.bool,
};

ShareBox.defaultProps = {
  hasCommentBox: true,
};

export default ShareBox;
