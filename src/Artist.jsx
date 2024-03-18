import React from 'react';

function Artist({ artist }) {
  return (
    <div className="artist">
        <img className="artist-image" src={artist.images[0].url} alt={artist.name} />
        <h2 className="artist-name">{artist.name}</h2>
    </div>
  );
}

export default Artist;
