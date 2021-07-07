import React from 'react';
import './style.css';
import logo from './logo.svg'

export function Load() {
    return (
        <div className="Load">
            <header className="Load-header">
                <img src={logo} className="Load-logo" alt="logo" />
            </header>
        </div>
    )
}