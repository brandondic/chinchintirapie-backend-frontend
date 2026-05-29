import React from 'react';

export default function MediaThumbnail({ url, alt, typeEmoji = '📂' }) {
  if (!url) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--rojo), var(--naranja))', fontSize: '3rem' }}>
        {typeEmoji}
      </div>
    );
  }

  // 1. YouTube Thumbnail
  const getYouTubeId = (url) => {
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYouTubeId(url);
  if (youtubeId) {
    const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
    return <img src={thumbnailUrl} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
  }

  // 2. PDF / Google Drive / Document Icon
  const isDocument = url.toLowerCase().includes('.pdf') || url.includes('drive.google.com');
  if (isDocument) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', color: '#d32f2f' }}>
        <span style={{ fontSize: '3rem' }}>📄</span>
        <span style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '0.5rem' }}>DOC</span>
      </div>
    );
  }

  // 3. MP4 / Video File Icon (since playing 50 videos in a list kills performance)
  const isVideo = url.match(/\.(mp4|webm|ogg)(\?.*)?$/i);
  if (isVideo) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#222', color: '#fff' }}>
        <span style={{ fontSize: '3rem' }}>🎬</span>
        <span style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Video</span>
      </div>
    );
  }

  // 4. Default to standard Image, but catch broken images
  return (
    <img 
      src={url} 
      alt={alt} 
      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      onError={(e) => {
        // Fallback si la imagen está rota o bloqueada (Ej. Error 403 Forbidden)
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--rojo), var(--naranja)); font-size: 3rem;">${typeEmoji}</div>`;
      }}
    />
  );
}
