import { useColorModeValue } from '@/components/ui/color-mode';
import { Heading, Toast, VStack } from '@chakra-ui/react';
import React from 'react'
import { useState } from "react";
import { Container, Box, Input, Button } from "@chakra-ui/react";
import { useProductStore } from '../store/product';
import { toaster} from "@/components/ui/toaster"

const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  
  const handleAddProduct = async() => {
    console.log(newProduct)
    const { success, message } = await createProduct(newProduct);
    if(!success){
        toaster.create({
          title: "Error",
          description: message,
          duration: 6000,
          closable: true,
        })
    }
    else{
      toaster.create({
        title: "Success",
        description: message,
        duration: 6000,
        closable: true,
      })
    }
  };


  return (
    <Container>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2X1"} textAlign={"center"} mb={"8"}>
          Create New Product
        </Heading>

        <Box 
          w={"full"} 
          bg={useColorModeValue("white","gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack>
            <Input 
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name:e.target.value})}
            >
            </Input>
            
            <Input 
              placeholder='Price'
              name='price'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price:e.target.value})}
            >
            </Input>

            <Input 
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image:e.target.value})}
            >
            </Input>

            <Button colorScheme='blue' w='full' onClick={handleAddProduct}>Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage