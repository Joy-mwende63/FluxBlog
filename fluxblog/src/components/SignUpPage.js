import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #fbc2eb, #a6c1ee);
`;

const SignupBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  text-align: center;
`;

const Title = styled.h2`
  color: #444;
  font-size: 28px;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 10px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Label = styled.label`
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #7b9acc;
    box-shadow: 0 0 5px rgba(123, 154, 204, 0.5);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #7b9acc;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #5678aa;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(123, 154, 204, 0.5);
  }
`;

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    const userData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      await axios.post('http://localhost:5000/api/signup', userData);
      history('/login'); // Redirect to login after successful signup
    } catch (error) {
      setErrorMessage('Error creating account. Please try again.');
    }
  };

  return (
    <Container>
      <SignupBox>
        <Title>Sign Up</Title>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <form onSubmit={handleSignup}>
          <FormGroup>
            <Label>Username:</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Confirm Password:</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormGroup>
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </form>
      </SignupBox>
    </Container>
  );
};

export default SignupPage;
