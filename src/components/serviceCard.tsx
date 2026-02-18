import React from 'react';
import { useGTM } from './gtm/useGTM';
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
    try {
      track('click_agendar_servicio', {
        servicio: servicio || title,
        button_text: buttonText,
      });
    } catch (error) {
      console.error('GTM tracking error:', error);
    }
  };

  return (
    <div className="pipod-bento-dark">
      <div className="bento-visual-zone">
        <img src={image_src} alt={title} className="bento-img-dark" />
      </div>
      
      <div className="bento-content-dark">
        <div className="bento-header-dark">
          <i className={`bi ${icon_name} bento-icon-accent`} aria-hidden="true"></i>
          <h3 className="bento-title-dark">{title}</h3>
        </div>

        <p className="bento-text-dark">{description}</p>
        
        <div className="bento-action-dark">
          <a 
            href={link} 
            className="bento-link-dark" 
            onClick={handleClick}
            aria-label={`${buttonText} - ${title}`}
          >
            {buttonText}
            <span className="bento-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
