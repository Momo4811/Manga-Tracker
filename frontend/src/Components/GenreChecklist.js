import React from 'react';

const GenreCheckbox = ({ genre, status, onChange }) => {
  const handleClick = () => {
    let newStatus;
    if (status === 'unchecked') newStatus = 'include';
    else if (status === 'include') newStatus = 'exclude';
    else newStatus = 'unchecked';
    onChange(genre, newStatus);
  };

  return (
    <label onClick={handleClick} className={`genre-checkbox ${status}`}>
      {genre}
    </label>
  );
};

export {GenreCheckbox};