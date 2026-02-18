import React from 'react';
import { useGTM } from './gtm';
import './serviceCard.css';

interface Props {
  image_src: string;
  icon_name: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  servicio?: string;
}

export default function ServiceBentoDark({ 
  image_src, 
  icon_name, 
  title, 
  description, 
  buttonText, 
  link,
  servicio
}: Props) {
  const { track } = useGTM();

  const handleClick = () => {
    track('click_agendar_servicio', {
      servicio: servicio || title,
      button_text: buttonText,
    });
  };
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
          <a href={link} className="bento-link-dark" onClick={handleClick}>
            {buttonText}
            <span className="bento-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}