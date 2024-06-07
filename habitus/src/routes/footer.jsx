import { Box, Flex, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.800" color="white" p={4} display="block"
    height={200}>
      <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Text>&copy; {new Date().getFullYear()} Alexandria. Todos os direitos reservados.</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
