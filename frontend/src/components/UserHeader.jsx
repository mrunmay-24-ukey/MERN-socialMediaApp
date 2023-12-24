import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack } from '@chakra-ui/react'
import React from 'react' 
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useToast } from '@chakra-ui/react'


const UserHeader = () => {

    // function to copy URL
    const copyURL = () => {
        let currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({ description: 'Copied' })
        });
    }

    const toast = useToast()

  return (
    <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={'full'}>
            <Box>
                <Text fontSize={"2xl"} fontWeight={"bold"}>Mark Zukerberg</Text>

                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"sm"}>markzukerberg</Text>
                    <Text fontSize={"xs"} bg={"gray.dark"} p={1} borderRadius={"full"}>threads.net</Text>
                </Flex>
            </Box>

            <Box>
                <Avatar name='Mark Zukerberg' src='/zuck-avatar.png' size={{
                    base:'md',
                    md:"xl",
                }}></Avatar>
            </Box>
        </Flex>


        <Text>Lorem ipsum dolor sit amet consectetur.</Text>
        <Flex w={"full"} justifyContent={"space-between"}>
            <Flex gap={2} alignItems={'center'}>
                <Text color={"gray.light"}>2.2k followers</Text>
                <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                <Link color={"gray.light"}>instagram.com</Link>
            </Flex>

            <Flex>
                <Box className='icon-container'>
                    <BsInstagram size={"24"} cursor={"pointer"}/>
                </Box>
                <Box className='icon-container'>
                    <Menu>
                        <MenuButton>
                            <CgMoreO size={"24"} cursor={"pointer"}/>
                        </MenuButton>
                        <Portal>
                            <MenuList bg={"gray.dark"}>
									<MenuItem bg={"gray.dark"} onClick={copyURL}>
										Copy link
									</MenuItem>
                                   
							</MenuList>
                        </Portal>
                    </Menu>
                    
                </Box>
            </Flex>
        </Flex>

        <Flex w={"full"}>
            <Flex flex={1} justifyContent={'center'} borderBottom={"1.5px solid white"} pb={3} cursor={'pointer'}>
                <Text fontWeight={'bold'}>Threads</Text>
            </Flex>
            <Flex flex={1} justifyContent={'center'} borderBottom={"1px solid gray"} color={'gray.light'}  pb={3} cursor={'pointer'}>
                <Text fontWeight={'bold'}>Replies</Text>
            </Flex>
        </Flex>
    </VStack>
  )
}

export default UserHeader