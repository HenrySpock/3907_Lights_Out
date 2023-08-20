import React from 'react';

function Cell({ isLit, toggleLight }) {
  return (
    <div className={`Cell ${isLit ? "Cell-lit" : ""}`} onClick={toggleLight}></div>
  );
}

export default Cell;
