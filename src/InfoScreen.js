import React, { useState } from 'react';
import './InfoScreen.css';

function InfoScreen({ onPlay }) {
    const [showBackCover, setShowBackCover] = useState(false);

    return (
        <div className="info-container">
            <a href="https://antoniodenuevo.com" target="_blank" rel="noopener noreferrer" className="top-right-link">
                A PROJECT BY <br />ANTONIO DE NUEVO
            </a>
            {!showBackCover ? (
                <div className="front-cover">
                    <h1>THE PRESIDENTIAL CHOIR</h1>
                    <h3>SEASON OF TWO THOUSAND AND TWENTY FOUR</h3>

                    <button className="cover-button" onClick={() => setShowBackCover(true)}>READ SYNOPSIS</button>
                </div>
            ) : (
                <div className="back-cover">
                    <h2>SYNOPSIS</h2>

                    <p>
                        The Presidential Choir is an audio-visual installation that reimagines the 2024 U.S. presidential debate as a four-voice choir accompanied by an organ. Drawing inspiration from the Baroque era’s recitativo secco style—where speech and melody blur to convey narrative with minimal accompaniment— the voices here are generated using text-to-speech technology, emphasising the mechanical and performative nature of the debate.

                        <br />As the choir performs, a teleprompter displays the lyrics—direct transcripts of the debate—guiding viewers through the orchestrated rhetoric. This visual element underscores the scripted nature of political theatre, inviting audiences to engage with the fleeting, often nonsensical content. Though the text is available for scrutiny, it reveals little of substance.

                        <br />The Presidential Choir confronts viewers with the absurdity of contemporary political communication, where spectacle overshadows substance and form masquerades as truth, echoing the dynamics of a debate where performance triumphs over meaning.                    </p>
                    <button className="cover-button" onClick={onPlay}>PLAY CHOIR</button>
                </div>
            )}
        </div>
    );
}

export default InfoScreen;
