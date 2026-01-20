import React from 'react';
import './serviceCard.css';

interface Props {
  image_src: string;
  icon_name: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

export default function ServiceBentoDark({ 
  image_src, 
  icon_name, 
  title, 
  description, 
  buttonText, 
  link 
}: Props) {
  return (
    <div className="pipod-bento-dark">
      <div className="bento-visual-zone">
        <img src={image_src} alt={title} className="bento-img-dark" />
      </div>
      
      <div className="bento-content-dark">
        <div className="bento-header-dark">
          {/* Se aplicará el color blanco via CSS */}
          <i className={`bi ${icon_name} bento-icon-accent`}></i>
          <h3 className="bento-title-dark">{title}</h3>
        </div>

        <p className="bento-text-dark">{description}</p>
        
        <div className="bento-action-dark">
          <a href={link} className="bento-link-dark">
            {buttonText}
            <span className="bento-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}