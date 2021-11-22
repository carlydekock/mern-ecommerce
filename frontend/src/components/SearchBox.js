import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(keyword.trim()){
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='d-flex'>
      <Form.Control type='text' name='search' onChange={(e) => setKeyword(e.target.value)} placeholder='Search products...' className='mr-sm-2 ml-sm-5'></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
    </Form>
  );
}

export default SearchBox;
