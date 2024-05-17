import React, { useEffect, useState } from 'react';
import '../css/Toggle.css'

const Toggle = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(prevState => !prevState);
  };



  useEffect(()=> {

   const root = document.querySelector('html')

 if(isActive){
  root.classList.add('dark')
  root.classList.remove('light')
 } else {
  root.classList.add('light')
  root.classList.remove('dark')
 }

  }, [isActive])

  return (
    <div className={`toggle-container px-1 py-1 shadow-lg ${isActive ? 'active' : ''}`} onClick={handleToggle}>
      <div className="toggle-handle"></div>
    </div>
  );
};

export default Toggle;