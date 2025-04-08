import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import ZoomableImage from './components/ZoomableImage'

// Media query breakpoints
const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  laptop: '1024px'
};

// Sample images - Replace these with your custom image paths
const IMAGES = {
  // Format: '/images/your-image-name.jpg'
  welcome: '/images/welcome-banner.jpg',      // Add a welcoming image
  venue: '/images/venue.jpg',                 // Add your venue image
  grandPlaza: '/images/grand-plaza.jpg',      // Add hotel exterior
  dressCode: '/images/dress-code.jpg',        // Add dress code example
  location: '/images/location-map.jpg',       // Add location/map image
  couple: '/images/couple.jpg',               // Add couple's photo
  travel: '/images/travel.jpg',               // Add travel-themed image
  paris: '/images/paris.jpg',                 // Add Paris engagement photo
  rsvp: '/images/rsvp.jpg',                  // Add RSVP-themed image
  celebration: '/images/celebration.jpg',      // Add celebration image
  plusOne: '/images/plus-one.jpg',           // Add plus-one themed image
  thankYou: '/images/thank-you.jpg',         // Add thank you image
  missYou: '/images/miss-you.jpg'            // Add miss you image
};

const AppContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: #efeae2;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`

const MainContent = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const ChatContainer = styled.div`
  background: url('/images/bgchat.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`

const ChatHeader = styled.div`
  background: rgba(255, 245, 247, 0.9);
  padding: 1rem;
  border-bottom: 1px solid rgba(251, 182, 206, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(251, 182, 206, 0.1);
`

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 1rem;
  overflow-y: auto;
  flex-grow: 1;
  scroll-behavior: smooth;
  position: relative;
  z-index: 2;

  /* Customize scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
`

const Message = styled.div`
  display: flex;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin: 0.1rem 0;
  position: relative;
`;

const MessageContent = styled.div`
  background-color: ${props => props.isUser ? 'rgba(231, 255, 219, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  max-width: 85%;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 1px 0.5px rgba(11,20,26,.13);
  backdrop-filter: blur(8px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    ${props => props.isUser ? 'right: -8px' : 'left: -8px'};
    width: 0;
    height: 0;
    border-top: 6px solid ${props => props.isUser ? 'rgba(231, 255, 219, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    transform: ${props => props.isUser ? 'rotate(-45deg)' : 'rotate(45deg)'};
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    max-width: 75%;
  }

  @media (min-width: ${BREAKPOINTS.laptop}) {
    max-width: 65%;
  }
`;

const MessageImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 0.5rem;
  margin: 0.5rem 0;
`

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(240, 242, 245, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(224, 224, 224, 0.5);
  z-index: 2;
`

const OptionButton = styled.button`
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(224, 224, 224, 0.5);
  color: #111b21;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  width: 100%;
  white-space: normal;
  text-align: left;
  line-height: 1.3;
  backdrop-filter: blur(8px);

  @media (min-width: ${BREAKPOINTS.tablet}) {
    font-size: 1rem;
  }

  &:hover {
    background-color: rgba(245, 246, 246, 0.95);
  }

  &:active {
    background-color: rgba(235, 235, 235, 0.95);
  }
`

const initialOptions = [
  {
    text: "Tell me about the wedding details",
    response: "What specific details would you like to know?",
    image: IMAGES.venue,
    nextOptions: [
      {
        text: "When and where is the wedding?",
        response: "The wedding will be held on Saturday, September 14th, 2024 at 4:00 PM at The Grand Plaza Hotel, 123 Love Street, New York, NY 10001.",
        image: IMAGES.grandPlaza,
        nextOptions: [
          {
            text: "What's the dress code?",
            response: "The dress code is Cocktail Attire. Think elegant but comfortable!",
            image: IMAGES.dressCode
          },
          {
            text: "How do I get there?",
            response: "The venue is easily accessible by public transport. The nearest subway station is Grand Central (5 min walk). Valet parking is also available.",
            image: IMAGES.location
          }
        ]
      },
      {
        text: "Tell me about the couple",
        response: "Sarah and John met at a coffee shop in downtown Manhattan. She spilled her coffee on his laptop, and the rest is history!",
        image: IMAGES.couple,
        nextOptions: [
          {
            text: "Any fun facts about them?",
            response: "They both love traveling and have visited 25 countries together! Their first date was actually at the same coffee shop where they met.",
            image: IMAGES.travel
          },
          {
            text: "What's their favorite memory together?",
            response: "Their favorite memory is their surprise engagement in Paris, where John proposed at sunset on the Eiffel Tower!",
            image: IMAGES.paris
          }
        ]
      }
    ]
  },
  {
    text: "I'd like to RSVP",
    response: "We'd love to have you! Please let us know:",
    image: IMAGES.rsvp,
    nextOptions: [
      {
        text: "Yes, I'll be there!",
        response: "Wonderful! We'll send you a confirmation email with all the details. Will you be bringing a plus one?",
        image: IMAGES.celebration,
        nextOptions: [
          {
            text: "Yes, bringing a plus one",
            response: "Perfect! We've noted that you'll be bringing a guest. Please check your email for dietary preference forms.",
            image: IMAGES.plusOne
          },
          {
            text: "No, coming solo",
            response: "Thanks for letting us know! We've updated your RSVP. Please check your email for the dietary preference form.",
            image: IMAGES.thankYou
          }
        ]
      },
      {
        text: "Sorry, can't make it",
        response: "We'll miss you! Thank you for letting us know. We'll send you photos from the celebration!",
        image: IMAGES.missYou
      }
    ]
  }
];

const MobileContainer = styled.div`
  min-height: 100vh;
  background-image: url('/images/bgscreen.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('/images/bgscreen.jpg');
    background-size: cover;
    background-position: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 245, 247, 0.3);
    backdrop-filter: blur(3px);
    z-index: 0;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const MobileScreen = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  
  @media (min-width: 768px) {
    width: 375px;
    height: 667px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 40px;
    box-shadow: 
      0 10px 25px rgba(0, 0, 0, 0.1),
      0 0 50px rgba(251, 182, 206, 0.3);
    position: relative;
    overflow: hidden;
    border: 12px solid #1a1a1a;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 30px;
      background: #1a1a1a;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      z-index: 1;
    }
  }
`;

const HeaderTitle = styled.h1`
  font-size: 1.2rem;
  color: #805ad5;
  margin: 0;
  text-align: center;
  font-family: 'Playfair Display', serif;
  letter-spacing: 1px;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: calc(100% - 120px);
  scroll-behavior: smooth;

  /* Customize scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
`;

const MessageText = styled.div`
  margin-bottom: 0.5rem;
`;

const App = () => {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = React.useState([
    {
      text: "Hi! I'm your wedding assistant. I'm here to help you with all the details about Sarah and John's special day! What would you like to know?",
      isUser: false,
      image: IMAGES.welcome
    }
  ]);
  const [currentOptions, setCurrentOptions] = React.useState(initialOptions);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end"
      });
    }
  };

  useEffect(() => {
    // Add a small delay to ensure content is rendered before scrolling
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const handleOptionClick = (option) => {
    const newMessages = [
      ...messages,
      { text: option.text, isUser: true },
      { text: option.response, isUser: false, image: option.image }
    ];
    setMessages(newMessages);
    
    if (option.nextOptions) {
      setCurrentOptions(option.nextOptions);
    } else {
      setCurrentOptions(initialOptions);
    }
  };

  return (
    <MobileContainer>
      <MobileScreen>
        <ChatContainer>
          <ChatHeader>
            <HeaderTitle>Wedding Chat</HeaderTitle>
          </ChatHeader>
          <ChatMessages>
            {messages.map((message, index) => (
              <Message key={index} isUser={message.isUser}>
                <MessageContent isUser={message.isUser}>
                  <MessageText>{message.text}</MessageText>
                  {message.image && (
                    <ZoomableImage
                      src={message.image}
                      alt="Wedding related"
                    />
                  )}
                </MessageContent>
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>
          <OptionsContainer>
            {currentOptions.map((option, index) => (
              <OptionButton
                key={index}
                onClick={() => handleOptionClick(option)}
              >
                {option.text}
              </OptionButton>
            ))}
          </OptionsContainer>
        </ChatContainer>
      </MobileScreen>
    </MobileContainer>
  );
};

export default App
