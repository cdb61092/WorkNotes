import { IconButton } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { getSearchableFields } from '../../api/';

// const searchNotes = () => {
//   const fields = getSearchableFields();
//   console.log('fields :', fields);
// };

const Search = () => {
  const fields = getSearchableFields();
  return (
    <IconButton
      aria-label='Search notes'
      size='md'
      color='#CCC'
      bg='#404040'
      mt='2'
      isRound
      _hover={{ background: '' }}
      icon={<AiOutlineSearch size='20px' />}
    />
  );
};

export { Search };
