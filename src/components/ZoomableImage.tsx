import React, { useState } from 'react';
import styled from 'styled-components';

// Media query breakpoints
const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  laptop: '1024px'
};

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
  margin: 0.5rem 0 0.25rem;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 250px;
  display: block;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(0.95);
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    max-width: 300px;
  }
`;

const LoadingPlaceholder = styled.div`
  width: 100%;
  max-width: 250px;
  height: 150px;
  background: #e2e2e2;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    max-width: 300px;
    height: 200px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalImage = styled.img`
  max-width: 95vw;
  max-height: 90vh;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

interface ZoomableImageProps {
  src: string;
  alt: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleCloseModal = () => {
    setIsZoomed(false);
  };

  if (error) {
    return null;
  }

  return (
    <>
      <ImageContainer onClick={handleImageClick}>
        {isLoading && <LoadingPlaceholder />}
        <StyledImage
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      </ImageContainer>

      {isZoomed && (
        <Modal onClick={handleCloseModal}>
          <ModalImage src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
          <CloseButton onClick={handleCloseModal}>×</CloseButton>
        </Modal>
      )}
    </>
  );
};

export default ZoomableImage; 