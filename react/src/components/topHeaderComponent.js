import React, { Component } from 'react';
import '../App.css';


const TopHeaderComponent = () => (
  <div className='TopHeader'>
    <div className='logoSize'>
      <img className="Logo" src={require('./images/Logo.png')}/>
    </div>
  </div>
)

export default TopHeaderComponent;
