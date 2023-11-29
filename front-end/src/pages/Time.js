import React from 'react';
import Header from './Header';
import './style/Time.css'; 

export default function Time() {
  return(
      <div>
        <Header />
        <h1>
            Times
          </h1>
          <div class="times">
            <div class="bragantino">
              <img src='bragantino logo.png' alt='bragantino'/>
              <a href="x">Bragantino</a>
            </div>
            <div class="palmeiras">
              <img src='palmeiras.png' alt='palmeiras'/>
              <a href="x">Palmeiras</a>
            </div>
          </div>
      </div>
  );
}