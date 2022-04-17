import axios, { AxiosRequestConfig } from 'axios';

interface Note {
  title: String;
  company?: String;
  description: String;
  note: String;
  tags?: String[];
  _id?: String;
}

axios.defaults.withCredentials = true;

const createNote = async (note: Note) => {
  const options: AxiosRequestConfig = {
    url: 'http://localhost:5000/note/create',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      note,
    },
  };

  axios(options).then((res) => console.log(res.data));
};

const getNotes = () => {
  const options: AxiosRequestConfig = {
    url: 'http://localhost:5000/note/getNotes',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return axios(options);
};

const updateNote = async (note: Note) => {
  const options: AxiosRequestConfig = {
    url: 'http://localhost:5000/note/updateNote',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: {
      note,
    },
  };

  return axios(options).then((res) => console.log(res.data));
};

export { createNote, getNotes, updateNote };
