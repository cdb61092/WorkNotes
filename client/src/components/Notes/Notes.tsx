import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CgFileDocument } from 'react-icons/cg';
import { useQuery } from 'react-query';
import { getNotes } from '../../api';
import { NoteCard } from '../NoteCard';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Editor } from '../Editor';
import { Outlet } from 'react-router-dom';

export const Notes = () => {
  const { data: notes } = useQuery('getNotes', () => getNotes());
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Flex h='100vh'>
        <Box
          w='20%'
          h='100vh'
          bg='#121212'
          overflow='scroll'
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Flex
            h='125px'
            bg='#282828'
            color='white'
            p={5}
            borderBottom='1px solid #424242'
            direction='column'
          >
            <Flex>
              <CgFileDocument size='20px' />
              <Heading fontWeight='normal' fontSize='20px' ml={2}>
                Notes
              </Heading>
            </Flex>
            <Box mt='auto'>{notes?.data && `${notes.data.length} notes`}</Box>
          </Flex>
          {notes?.data &&
            notes.data.map((note: any) => {
              return <NoteCard key={note._id as React.Key} note={note} />;
            })}
        </Box>
        <Outlet />
      </Flex>
    </FormProvider>
  );
};
