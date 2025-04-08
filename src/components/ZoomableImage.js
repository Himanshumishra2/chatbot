import React, { useState } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const StyledImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  transition: transform 0.3s ease;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90vh;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const ZoomableImage = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <ImageContainer onClick={() => setIsOpen(true)}>
        <StyledImage
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      </ImageContainer>

      {isOpen && (
        <Modal onClick={() => setIsOpen(false)}>
          <ModalImage src={src} alt={alt} />
          <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
        </Modal>
      )}
    </>
  );
};

export default ZoomableImage; 