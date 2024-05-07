import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Button, Image, VStack, HStack, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody } from "@chakra-ui/react";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="App">
      <Box as="header">
        <HStack as="nav" p={5} bg="teal.500" color="white" justifyContent="space-between">
          <Heading>Habitus</Heading>
          <Text onClick={onOpen} className="menu-icon">
            {isOpen ? 'X' : '☰'}
          </Text>
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                 <DrawerBody>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </HStack>
      </Box>
      <Box as="main">
        <VStack as="section" className="home" p={5}>
          <Link to="/sobre">Sobre</Link> {/* Altere o caminho para "/sobre" */}
          <Image src="" alt="Girassol" className="background-gif" />
          <Heading className="title">Habitus</Heading>
          <Text className="subtitle">Transforme sua vida com hábitos saudáveis.</Text>
          <Button className="start-button" colorScheme="teal">Iniciar Hábitos Saudáveis</Button>
        </VStack>
      </Box>

      <Box as="footer" p={5} bg="teal.500" color="white" textAlign="center">
        <Text>© 2024 Habitus. Todos os direitos reservados.</Text>
        <Text>Política de Privacidade | Termos e Condições</Text>
      </Box>
    </Box>
  );
}
