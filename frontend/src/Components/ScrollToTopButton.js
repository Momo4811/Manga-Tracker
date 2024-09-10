import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './ScrollToTopButton.css';

const ScrollToTopButton = () => {
  const { pathname, search } = useLocation();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    handleScrollToTop();
  }, [pathname, search]); 

  return (
    <button className="scroll-to-top" onClick={handleScrollToTop}>
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
};

export { ScrollToTopButton };