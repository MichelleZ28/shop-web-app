//import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Text,
	VStack,
    Dialog, Portal, createOverlay 
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { toaster} from "@/components/ui/toaster";
import { useColorModeValue } from "../components/ui/color-mode";
import { useState } from "react";

const ProductCard = ({ product }) => {
	const textColor = useColorModeValue("red.500", "red.200");
	const bg = useColorModeValue("white", "gray.800");
	const { deleteProduct, updateProduct } = useProductStore();

    //call the early return stuff after the react hooks
    if (!product || typeof product !== 'object') {
        console.warn('ProductCard received bad product:', product);
        return null; // don't render broken item
    }

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toaster.create({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toaster.create({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		if (!success) {
			toaster.create({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toaster.create({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
            p={5}
            m={4}
		>
			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={2}>
					<IconButton 
                        onClick={() => {
                            EditDialog.open(product._id, {
                            product,
                            onSubmit: handleUpdateProduct,
                            title: "Update Product",
                        })}}
                        colorPalette="gray"
                    >
                        <FaEdit />
                    </IconButton>
					<IconButton
						onClick={() => handleDeleteProduct(product._id)}
                        colorPalette="gray"
					>
                        <MdDeleteForever />
                    </IconButton>
				</HStack>
			</Box>
		</Box>
	);
};


/* ---------- Overlay kept in THIS file ---------- */
const EditDialog = createOverlay((props) => {
  const { product, onSubmit, title = "Update Product", ...rest } = props;
  const [updated, setUpdated] = useState({
    _id: product?._id ?? "",
    name: product?.name ?? "",
    price: product?.price ?? "",
    image: product?.image ?? "",
  });

  const onChange = (field) => (e) =>
    setUpdated((p) => ({ ...p, [field]: e.target.value }));

  const handleSave = async () => {
    const payload = {
      ...updated,
      // coerce price to number if needed
      price:
        typeof updated.price === "string" && updated.price !== ""
          ? Number(updated.price)
          : updated.price,
    };
    await onSubmit(updated._id, payload);
    EditDialog.close(updated._id);
  };

  return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.CloseTrigger />
            </Dialog.Header>
            <Dialog.Body>
              <VStack spacing={4}>
                <Input
                  placeholder="Product Name"
                  value={updated.name}
                  onChange={onChange("name")}
                />
                <Input
                  placeholder="Price"
                  type="number"
                  value={updated.price}
                  onChange={onChange("price")}
                />
                <Input
                  placeholder="Image URL"
                  value={updated.image}
                  onChange={onChange("image")}
                />
                <Button colorPalette="blue" onClick={handleSave}>
                    Update
                </Button>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export default ProductCard;
/* Mount this ONCE per app/page. Kept in same file for convenience. */
export const EditDialogViewport = () => <EditDialog.Viewport />;
