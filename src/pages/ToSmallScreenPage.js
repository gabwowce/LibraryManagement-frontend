import React from 'react';
import { useState, useEffect } from 'react';
import StatsMini from '../components/dashboard-components/StatsMini';
import StatsBig from '../components/dashboard-components/StatsBig';
import IncomingBooks from '../components/dashboard-components/IncomingBooks';
import config from '../config';

function LoadingPage() {
  return (
    <div>
        <h1>
            Your screen is too small to view this content properly. 
            Please resize your browser window for the best experience.
        </h1>
    </div>
  );
}

export default LoadingPage;