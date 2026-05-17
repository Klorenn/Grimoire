import React from 'react';

export function VideoPlayer({ src, mimeType = 'video/mp4' }) {
  return (
    <div style={{ borderRadius: 14, overflow: 'hidden', background: '#000' }}>
      <video controls style={{ width: '100%', maxHeight: '60vh' }} playsInline>
        <source src={src} type={mimeType} />
      </video>
    </div>
  );
}

export function AudioPlayer({ src, mimeType = 'audio/mpeg' }) {
  return (
    <div className="app-card" style={{ padding: 20, textAlign: 'center' }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>🎵</div>
      <audio controls style={{ width: '100%' }}>
        <source src={src} type={mimeType} />
      </audio>
    </div>
  );
}
