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
            <div class="titulo">
              <img src='bragantino logo.png' alt='bragantino'/>
              <a href="x">Bragantino</a>
            </div>
            <div class="box">
              <div class="jogadores">
                <h1>Jogadores</h1>
                {/* eu nao sei como fazer... soh uma tentativa do chat */}
                <ul>
                  {Object.entries(teams).map(([teamName, teamInfo]) => (
                    <li key={teamName}>
                      <strong>{teamName}</strong>: {JSON.stringify(teamInfo)}
                    </li>
                  ))}
                </ul>
                <ul>
                  {Object.entries(teams).map(([teamName, teamInfo]) => (
                    <li key={teamName}>
                      <strong>{teamName}</strong>: {JSON.stringify(teamInfo)}
                    </li>
                  ))}
                </ul>
                <ul>
                  {Object.entries(teams).map(([teamName, teamInfo]) => (
                    <li key={teamName}>
                      <strong>{teamName}</strong>: {JSON.stringify(teamInfo)}
                    </li>
                  ))}
                </ul>
                <ul>
                  {Object.entries(teams).map(([teamName, teamInfo]) => (
                    <li key={teamName}>
                      <strong>{teamName}</strong>: {JSON.stringify(teamInfo)}
                    </li>
                  ))}
                </ul>
                <ul>
                  {Object.entries(teams).map(([teamName, teamInfo]) => (
                    <li key={teamName}>
                      <strong>{teamName}</strong>: {JSON.stringify(teamInfo)}
                    </li>
                  ))}
                </ul>
                <ul>
                  {Object.entries(teams).map(([teamName, teamInfo]) => (
                    <li key={teamName}>
                      <strong>{teamName}</strong>: {JSON.stringify(teamInfo)}
                    </li>
                  ))}
                </ul>
                <ul>
                  {Object.entries(teams).map(([teamName, teamInfo]) => (
                    <li key={teamName}>
                      <strong>{teamName}</strong>: {JSON.stringify(teamInfo)}
                    </li>
                  ))}
                </ul>
                <ul>
                  {Object.entries(teams).map(([teamName, teamInfo]) => (
                    <li key={teamName}>
                      <strong>{teamName}</strong>: {JSON.stringify(teamInfo)}
                    </li>
                  ))}
                </ul>
                <ul>
                  {Object.entries(teams).map(([teamName, teamInfo]) => (
                    <li key={teamName}>
                      <strong>{teamName}</strong>: {JSON.stringify(teamInfo)}
                    </li>
                  ))}
                </ul>
                <ul>
                  {Object.entries(teams).map(([teamName, teamInfo]) => (
                    <li key={teamName}>
                      <strong>{teamName}</strong>: {JSON.stringify(teamInfo)}
                    </li>
                  ))}
                </ul>
                <ul>
                  {Object.entries(teams).map(([teamName, teamInfo]) => (
                    <li key={teamName}>
                      <strong>{teamName}</strong>: {JSON.stringify(teamInfo)}
                    </li>
                  ))}
                </ul>
                <ul>
                  {Object.entries(teams).map(([teamName, teamInfo]) => (
                    <li key={teamName}>
                      <strong>{teamName}</strong>: {JSON.stringify(teamInfo)}
                    </li>
                  ))}
                </ul>
                <ul>
                  {Object.entries(teams).map(([teamName, teamInfo]) => (
                    <li key={teamName}>
                      <strong>{teamName}</strong>: {JSON.stringify(teamInfo)}
                    </li>
                  ))}
                </ul>
              </div>
              <div class="coisinhas">
                <h3>Rupturas</h3>
                <h3>Cruzamentos</h3>
              </div>
            </div>
          </div>
          <div class="palmeiras">
            <div class="titulo">
              <img src='palmeiras.png' alt='palmeiras'/>
              <a href="x">Palmeiras</a>
            </div>
          </div>
        </div>
      </div>
  );
}