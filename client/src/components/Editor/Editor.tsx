import { CustomToolbar, formats, modules } from '../CustomToolbar';
import ReactQuill, { Quill } from 'react-quill';
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Flex, Input, HStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { Tag } from '../Tag';
import { updateNote } from '../../api';
import { useQueryClient, useMutation } from 'react-query';
import 'react-quill/dist/quill.snow.css';

export const Editor = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue, watch } = useFormContext();
  const mutation = useMutation(updateNote, {
    onSuccess: (data) => {
      setTimeout(() => queryClient.invalidateQueries('getNotes'), 100);
    },
  });

  const [tags, setTags] = useState<String[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  useEffect(() => {
    register('note', { required: true });
  }, [register]);

  useEffect(() => {
    register('tags');
  }, [register]);

  const watchedTags = watch('tags');

  // useEffect(() => {
  //   setTags(watchedTags);
  // }, [watchedTags]);

  const onEditorStateChange = (value: any) => {
    setValue('note', value);
  };

  useEffect(() => {
    setValue('tags', tags);
  }, [tags, setValue]);

  const editorContent = watch('note');

  const onSubmit = async (data: any) => {
    mutation.mutate(data);
  };

  const onTagEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setTags((prevTags) => [...prevTags, currentTag]);
    setCurrentTag('');
  };

  const onTagClose = useCallback(
    (tagName: String) => {
      setTags(
        tags.filter((tag) => {
          return tag !== tagName;
        })
      );
    },
    [tags]
  );

  return (
    <Box h='100vh' w='80%' bg='#121212' color='white' sx={{}}>
      <Box
        className='text-editor'
        bg='white'
        color='black'
        sx={{ '.ql-container.ql-snow': { borderTop: 'none' } }}
      >
        <Input
          type='text'
          variant='ghost'
          placeholder='Title'
          _placeholder={{ color: 'gray.500' }}
          {...register('title', { required: true })}
          size='lg'
          fontSize='3xl'
        ></Input>
        <CustomToolbar />
        <ReactQuill
          theme='snow'
          value={editorContent || ''}
          onChange={onEditorStateChange}
          modules={modules}
          formats={formats}
        />
        <Flex borderBottom='1px solid gray' h='40px' align='center'>
          <Input
            placeholder='Type to add...'
            _placeholder={{ color: 'gray.800' }}
            _focus={{}}
            bg='gray.300'
            w='120px'
            h='80%'
            fontSize={13}
            borderRadius={50}
            onKeyPress={(e) => e.key === 'Enter' && onTagEnter(e)}
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
          />
          <HStack>
            {tags.map((tag) => {
              return (
                <Tag
                  label={tag}
                  onTagClose={onTagClose}
                  key={tag as React.Key}
                />
              );
            })}
          </HStack>
        </Flex>

        <Button
          bg='green'
          mt={5}
          type='submit'
          onClick={handleSubmit(onSubmit)}
        >
          Update
        </Button>

        <Input
          type='text'
          placeholder='Description'
          _placeholder={{ color: 'gray.500' }}
          {...register('description')}
        />
        <Input
          type='text'
          placeholder='Company'
          _placeholder={{ color: 'gray.500' }}
          {...register('company')}
        />
      </Box>
    </Box>
  );
};
