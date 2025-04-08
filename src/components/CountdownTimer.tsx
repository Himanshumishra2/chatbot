import { Box, Text, Stack } from '@chakra-ui/react';
import Countdown from 'react-countdown';

const weddingDate = new Date('2024-09-14T16:00:00');

const CountdownTimer = () => {
  const renderer = ({ days, hours, minutes, seconds }: any) => (
    <Stack spacing={2} p={4} bg="white" borderRadius="lg" boxShadow="base">
      <Text fontSize="lg" fontFamily="heading" color="wedding.600">
        Countdown to the Big Day
      </Text>
      <Box
        display="flex"
        gap={4}
        fontSize="2xl"
        fontWeight="bold"
        color="wedding.400"
      >
        <Box textAlign="center">
          <Text>{days}</Text>
          <Text fontSize="sm">Days</Text>
        </Box>
        <Box textAlign="center">
          <Text>{hours}</Text>
          <Text fontSize="sm">Hours</Text>
        </Box>
        <Box textAlign="center">
          <Text>{minutes}</Text>
          <Text fontSize="sm">Minutes</Text>
        </Box>
        <Box textAlign="center">
          <Text>{seconds}</Text>
          <Text fontSize="sm">Seconds</Text>
        </Box>
      </Box>
    </Stack>
  );

  return <Countdown date={weddingDate} renderer={renderer} />;
};

export default CountdownTimer; 