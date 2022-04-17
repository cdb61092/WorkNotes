import {
  Tag as CTag,
  TagLabel,
  TagLeftIcon,
  TagCloseButton,
} from '@chakra-ui/react';
import { AiFillTag } from 'react-icons/ai';

type Props = {
  label: String;
  onTagClose?: ((tagName: String) => void) | null;
  key: React.Key;
};

export const Tag = ({ label, onTagClose }: Props) => {
  return (
    <CTag>
      <TagLeftIcon as={AiFillTag} />
      <TagLabel>{label}</TagLabel>
      {onTagClose && <TagCloseButton onClick={() => onTagClose(label)} />}
    </CTag>
  );
};
