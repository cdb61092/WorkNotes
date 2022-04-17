import { Flex, Text, HStack } from '@chakra-ui/react';
import moment, { MomentInput } from 'moment';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Tag } from '../Tag';

export const NoteCard = ({ note }: any) => {
  const { setValue } = useFormContext();
  const click = () => {
    setValue('note', note.note);
    setValue('title', note.title);
    setValue('company', note.company);
    setValue('description', note.description);
    setValue('_id', note._id);
    setValue('tags', note.tags);
  };
  return (
    <Link to={`/notes/${note._id}`}>
      <Flex
        h='125px'
        bg='#282828'
        borderBottom='1px solid #424242'
        px='26px'
        py='16px'
        direction='column'
        onClick={click}
      >
        <Text>{note.title}</Text>
        <Text color='gray.500'>{note.description}</Text>
        <HStack>
          {note.tags?.map((tag: string) => {
            return <Tag label={tag} key={tag as React.Key} onTagClose={null} />;
          })}
        </HStack>

        <Text mt='auto'>{moment(note.createdAt as MomentInput).fromNow()}</Text>
      </Flex>
    </Link>
  );
};
