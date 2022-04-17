import { Heading, Button, Box, VStack } from '@chakra-ui/react';
import { useAuth } from '../../context/auth';
import { getNotes } from '../../api';
import { useDisclosure } from '@chakra-ui/react';

const Home = () => {
  const { user } = useAuth();
  const { onOpen } = useDisclosure();

  return (
    <Box h='100vh'>
      <VStack>
        <Heading>Welcome, {user?.username}</Heading>
        <Button onClick={onOpen}>create note</Button>
        <Button onClick={() => getNotes()}>get notes</Button>
      </VStack>
    </Box>
  );
};

export { Home };
