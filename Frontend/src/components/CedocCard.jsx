import React from 'react';
import { Link } from 'react-router-dom';
import MediaThumbnail from './MediaThumbnail';
import './CedocCard.css';

export default function CedocCard({ article }) {
  const { id, title, description, categories, url, thumbnailUrl, date, createdAt, author } = article;
  
  const displayDate = date || createdAt || 'Fecha no disponible';
  const displayAuthor = author || 'CEDOC';

  return (
    <Link to={`/cedoc/${id}`} className="link-reset">
      <div className="cedoc-card-custom reveal">
        <div className="cedoc-card-left">
          <div className="cedoc-card-thumb">
            <MediaThumbnail url={url} thumbnailUrl={thumbnailUrl} alt={title} typeEmoji="📚" />
          </div>
        </div>
        <div className="cedoc-card-right">
          <div className="cedoc-card-header">
            <span className="cedoc-card-date">{displayDate}</span>
            <h3 className="cedoc-card-title">{title}</h3>
          </div>
          <p className="cedoc-card-desc">{description}</p>
          <div className="cedoc-card-footer">
            <div className="cedoc-card-tags">
              {categories && categories.map((t) => (
                <span className="cedoc-card-chip" key={t}>{t}</span>
              ))}
              <span className="cedoc-card-chip">CEDOC</span>
            </div>
            <div className="cedoc-card-author">
              Por {displayAuthor}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
