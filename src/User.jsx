import React, { useState, useEffect } from 'react';
import Artist from './Artist';
import Spotify_Icon from './Images/Spotify_Icon.png';
import Microphone from './Images/microphone.png';
import Music_Note from './Images/musical_note.png';

function User(props) {
    const [topArtists, setTopArtists] = useState([]);
    const [selectedTimeRange, setSelectedTimeRange] = useState('short_term');
    const [selectedButton, setSelectedButton] = useState('1');
    const [leftButton, setLeftButton] = useState('1');

    useEffect(() => {
        // Call the initial function to fetch top artists based on the default time range
        getTopArtists();
    }, [props.token]);

    // Function to fetch top artists based on the selected time range
    async function fetchTopArtists(timeRange) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`, {
                method: "GET",
                headers: { Authorization: `Bearer ${props.token}` },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch top artists');
            }

            const data = await response.json();
            setTopArtists(data.items);
        } catch (error) {
            console.error(error);
        }
    }

    // Function to handle button click and fetch top artists for the selected time range
    const handleButtonClick = async (timeRange, buttonId) => {
        setSelectedButton(buttonId);
        setSelectedTimeRange(timeRange);
        await fetchTopArtists(timeRange);
    };

    // Function to handle left button click
    const handleLeftButtonClick = (buttonId) => {
        setLeftButton(buttonId);
    };

    // Function to fetch top artists for the default time range
    async function getTopArtists() {
        await fetchTopArtists('short_term');
    }

    return (
        <div className="top-content">
            {leftButton === '1' && (
                <div className="header">
                    <h1>Top Artists</h1>
                </div>
            )}
            {leftButton === '2' && (
                <div className="header">
                    <h1>Top Tracks</h1>
                </div>
            )}

            <div className="left-navbar">
                <img className='spotify-icon' src={Spotify_Icon} alt="Spotify Icon" />
                <button className={leftButton === '1' ? 'artists-tracks-button-clicked' : 'artists-tracks-button'} onClick={() => handleLeftButtonClick('1')}>
                    <img className='icon' src={Microphone} alt="Microphone Icon" />
                    Top Artists
                </button>
                <button className={leftButton === '2' ? 'artists-tracks-button-clicked' : 'artists-tracks-button'} onClick={() => handleLeftButtonClick('2')}>
                    <img className='icon' src={Music_Note} alt="Music Note Icon" />
                    Top Tracks
                </button>
                <button className='logout-button' >
                    Logout
                </button>
            </div>

            <div className="navbar">
                <button className={selectedButton === '1' ? 'top-nav-bar-clicked' : 'top-nav-bar-normal'} onClick={() => handleButtonClick('short_term', '1')}>Last 4 Weeks</button>
                <button className={selectedButton === '2' ? 'top-nav-bar-clicked' : 'top-nav-bar-normal'} onClick={() => handleButtonClick('medium_term', '2')}>Last 6 Months</button>
                <button className={selectedButton === '3' ? 'top-nav-bar-clicked' : 'top-nav-bar-normal'} onClick={() => handleButtonClick('long_term', '3')}>All Time</button>
            </div>

            <div className="main-content">
                {leftButton === '1' && (
                    // Display top artists based on the selected time range
                    <>

                        <div className="artist-container">
                            {topArtists.map(artist => (
                                <Artist key={artist.id} artist={artist} />
                            ))}
                        </div>
                    </>
                )}

                {leftButton === '2' && (
                    // Display top tracks or any other content for the second button
                    <div>
                        {/* Add your content for top tracks or any other content here */}
                        <p>Content for Top Tracks goes here</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default User;
