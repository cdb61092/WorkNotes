import {
  AiFillPlusCircle,
  AiOutlineSearch,
  AiOutlinePlus,
} from 'react-icons/ai';
import { IoIosHome } from 'react-icons/io';
import { CgFileDocument } from 'react-icons/cg';
import { IconButton, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Search } from '../Search';

export const Sidebar = () => {
  return (
    <Flex
      pos='absolute'
      top='0'
      left='0'
      h='100vh'
      w='50px'
      bg='black'
      direction='column'
      align='center'
    >
      <Search />
      <Link as={RouterLink} to='/notes/create' w='100%'>
        <IconButton
          aria-label='New note'
          size='md'
          bg='#00a82d'
          isRound
          mt='2'
          _hover={{ background: '' }}
          icon={<AiOutlinePlus size='20px' />}
        />
      </Link>
      <Link as={RouterLink} to='/home' w='100%'>
        <IconButton
          aria-label='Home'
          size='md'
          bg='transparent'
          mt='2'
          h='30px'
          w='100%'
          borderRadius={0}
          color='#ccc'
          _hover={{ background: '#333' }}
          icon={<IoIosHome size='25px' />}
          _focus={{ boxShadow: 'none' }}
        />
      </Link>
      <Link as={RouterLink} to='/notes' w='100%'>
        <IconButton
          aria-label='Notes'
          size='md'
          bg='transparent'
          h='30px'
          w='100%'
          borderRadius={0}
          color='#ccc'
          _hover={{ background: '#333' }}
          icon={<CgFileDocument size='25px' />}
          _focus={{ boxShadow: 'none' }}
        />
      </Link>
      {/* </Flex> */}
    </Flex>
  );
};
