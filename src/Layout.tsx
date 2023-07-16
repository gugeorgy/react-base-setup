import React from 'react';
import { Container } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <Container maxW={{ base: '100%' }}>{children}</Container>;
}
