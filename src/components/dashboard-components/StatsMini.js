import React from "react";
import config from '../../config';

function StatsMini({totalInfo}) {
    return (
        <div className="stats-mini-board">
            <div className="main-info">
                <div className="info"> 
                    <div className="total">
                        <h4>{totalInfo.title}</h4>
                    </div>
                    <div className="amount">
                        <h2>{totalInfo.amount}</h2>
                    </div>
                </div>
                <img className="stats-icon" src={totalInfo.statsIcon} alt="stats icon"/>
            </div>
            <div className="down-up-stats"> 
                <img className="down-or-up-icon" src={totalInfo.downOrUpIcon} alt="Arrow Icon"/>
                <h4 className="procentage">{totalInfo.procentage}</h4>
                <h4 className="down-up-stats-text">{totalInfo.downUpInfo}</h4>
            </div>
        </div>
    );
}

export default StatsMini;
