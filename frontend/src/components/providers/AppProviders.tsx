import React, { ReactNode } from 'react';
import { AuthProvider } from '../../context/AuthContext';
import { GroceryProvider } from '../../context/GroceryContext';

export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <GroceryProvider>{children}</GroceryProvider>
    </AuthProvider>
  );
};
