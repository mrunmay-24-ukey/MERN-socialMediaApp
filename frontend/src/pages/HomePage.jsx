import { Link , Flex , Button } from '@chakra-ui/react'
import React from 'react'

const HomePage = () => {
  return (
    <Link href={'/markzukerberg'}>
        <Flex w={'full'} justifyContent={'center'}>
            <Button mx={'auto'}>Visit Profile Page</Button>
        </Flex>
    </Link>
  )
}

export default HomePage