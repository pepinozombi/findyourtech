import { Input } from '@mui/material';
import React from 'react'
import { Form } from "react-bootstrap";
import validateUniqueName from '../../functions/validateUniqueName';

const uniqueName = ({
    uniqueName,
    error,
    handleChange
}) => {

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);  
  const handleChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
      const validationError = validateUniqueName(value);
      setError(validationError);
  };
  return (
    <Form.Group className="w-100 ms-1 mb-2" controlId="uniqueName" style={{maxWidth: '175px'}}>
      <Input type="text" value={inputValue} onChange={handleChange} />
      {error && <div>{error}</div>}
    </Form.Group>
  )
}

export default uniqueName;
