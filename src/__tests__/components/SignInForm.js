import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { SignInForm } from '../../components/SignIn';
import { Formik } from 'formik';

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      
      render(<SignInForm onSubmit={onSubmit} />);
      
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
      fireEvent.press(screen.getByTestId('SignInBtn'));
      
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});