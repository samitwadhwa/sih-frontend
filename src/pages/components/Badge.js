import React from 'react';

const SIZE_TO_REM = {
  small: '0.6rem',
  normal: '0.7rem',
  big: '0.9rem',
};

function Badge({ text, color, size }) {
  const styledBadge = {
    color: 'white',
    borderRadius: '0.31rem',
    paddingBlock: size === 'small' ? '0.1rem' : '0.15rem',
    paddingInline: '0.25rem',
    fontSize: SIZE_TO_REM[size] || '0.7rem',
    cursor: 'pointer',
    backgroundColor: color ? color : '#030F2754',
  };
  return <span style={styledBadge}>{text}</span>;
}

export default Badge;
