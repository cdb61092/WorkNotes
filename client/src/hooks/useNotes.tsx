import { useState } from 'react';
export const useNotes = () => {
  const [notes, setNotes] = useState<Object[]>([]);

  return notes;
};
