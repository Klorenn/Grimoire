import React from 'react';

/**
 * Simple lightbox for viewing images.
 * Shows full-screen overlay with the image.
 */
export function PhotoViewer({ src, onClose }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26,46,53,0.85)', backdropFilter: 'blur(10px)', cursor: 'pointer' }}
      onClick={onClose}
    >
      <img
        src={src}
        alt=""
        style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
        onClick={e => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        ✕
      </button>
    </div>
  );
}
