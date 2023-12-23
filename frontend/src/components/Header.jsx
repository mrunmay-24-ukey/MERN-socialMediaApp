import React from 'react'
import { Flex, Image, useColorMode } from '@chakra-ui/react'


const Header = () => {
  const {colorMode , toggleColorMode} = useColorMode()
  return (
    <Flex justifyContent={"center"} mt="6" mb="12">
        <Image src={colorMode == 'dark' ? "/light-logo.svg" : "dark-logo.svg"} cursor={'pointer'} onClick={toggleColorMode} w={6}/>
    </Flex>
  )
}

export default Header