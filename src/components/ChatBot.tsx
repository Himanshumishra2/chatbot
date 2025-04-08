import { useState, useRef, useEffect } from 'react';
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  Container,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { Avatar } from '@chakra-ui/avatar';
import { motion } from 'framer-motion';

interface Message {
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    text: "Hi! I'm your wedding assistant. I'm here to help you with all the details about Sarah and John's special day! What would you like to know?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

const MotionBox = motion(Box);

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // TODO: Integrate with ChatGPT API
    // For now, using mock responses
    setTimeout(() => {
      const botResponse: Message = {
        text: getBotResponse(input.toLowerCase()),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    if (input.includes('rsvp')) {
      return "Great! To RSVP, please let me know your name and whether you'll be attending. Will you be bringing a plus one?";
    } else if (input.includes('date') || input.includes('when')) {
      return "The wedding will be held on Saturday, September 14th, 2024 at 4:00 PM. Don't forget to mark your calendar!";
    } else if (input.includes('where') || input.includes('location') || input.includes('venue')) {
      return 'The ceremony and reception will be held at The Grand Plaza Hotel, 123 Love Street, New York, NY 10001.';
    } else if (input.includes('dress code')) {
      return 'The dress code is Cocktail Attire. Think elegant but comfortable!';
    } else if (input.includes('story') || input.includes('meet')) {
      return 'Sarah and John met at a coffee shop in downtown Manhattan. She spilled her coffee on his laptop, and the rest is history! Would you like to hear more?';
    }
    return "I'm not sure about that. Would you like to know about the venue, date, dress code, or would you like to RSVP?";
  };

  return (
    <Container maxW="container.md" py={8}>
      <Stack spacing={4} align="stretch" h="70vh">
        <Box
          flex={1}
          overflowY="auto"
          borderRadius="lg"
          bg="white"
          p={4}
          boxShadow="base"
        >
          {messages.map((message, index) => (
            <Flex
              key={index}
              justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
              mb={4}
            >
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                maxW="70%"
              >
                <Flex
                  alignItems="center"
                  gap={2}
                  flexDirection={message.sender === 'user' ? 'row-reverse' : 'row'}
                >
                  <Avatar
                    size="sm"
                    name={message.sender === 'user' ? 'User' : 'Wedding Bot'}
                    bg={message.sender === 'user' ? 'wedding.400' : 'wedding.600'}
                  />
                  <Box
                    bg={message.sender === 'user' ? 'wedding.300' : 'wedding.200'}
                    p={3}
                    borderRadius="lg"
                  >
                    <Text>{message.text}</Text>
                  </Box>
                </Flex>
              </MotionBox>
            </Flex>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Flex gap={2}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            bg="white"
          />
          <Button
            colorScheme="purple"
            onClick={handleSendMessage}
            px={8}
          >
            Send
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
}; 