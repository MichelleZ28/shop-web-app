import { useProductStore } from '@/store/product';
import { Container, VStack, Text, SimpleGrid} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import ProductCard, { EditDialogViewport } from "../component/ProductCard";


const HomePage = () => { 
  const {fetchProducts} = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const products = useProductStore((s) => s.products) || [];
  console.log(products);

  return (
    <Container maxW="container.x1" py={12}>
      <VStack spacing={8}>
        <Text 
          fontSize={"xl"}
          fontWeight={"bold"}
          color='purple.500'
        >
          Current Products
        </Text>

        <SimpleGrid 
          columns ={
            {
              base: 1,
              md: 2,
              lg: 3,
            }
          }
          spacingX={8} spacingY={12}
          w={"full"}
        >
          {products.length > 0 && products.map((p) => <ProductCard key={p._id} product={p} />)}
        </SimpleGrid>

        {products.length === 0 &&       
          (<Text fontSize='x1' textAlign={"center"} fontWeight='bold' color='gray.500'>
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
          </Text>
          )
        }
      </VStack>
      <EditDialogViewport />
    </Container>
  )
}

export default HomePage