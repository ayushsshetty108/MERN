import React from 'react'
import { Container, Flex } from '@chakra-ui/react'


function Navbar() {
  return (
    <>
      <Container maxW="1140px" px={4}>
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-around"
          flexDir={{ base: "column", sm: "row" }}   // ✅ correct usage
        >
          {/* Navbar content goes here */}
        </Flex>
      </Container>
    </>
  );
}

export default Navbar