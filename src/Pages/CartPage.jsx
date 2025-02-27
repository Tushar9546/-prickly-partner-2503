import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  StackDivider,
  Button,
  Image,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  RadioGroup,
  Stack,
  Radio,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartData } from "../Redux/CartReducer/action";
import CartOrderPayment from "../Components/CartOrderPayment";
import { updateCartData , deleteCartData} from "../Redux/CartReducer/action";



const CartPage = () => {
  const [inputCoupon, setInputCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [coupDiscount, setCoupDiscount] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [value, setValue] = useState(0);
  const cartData = useSelector((store) => store.cartReducer.cartData);
  const loading = useSelector((store) => store.cartReducer.isLoading);
  console.log("CartData:", cartData);

  
  const dispatch = useDispatch();
  const [total, setTotal] = useState(
    cartData?.reduce((acc, item) => acc + Number(item.price * item.count), 0)
  );
  console.log(typeof(total),"total",total)
  const mrpTotal = cartData?.reduce(
    (acc, item) => acc + Number(item.mrp * item.count),
    0
  );
  const totalDiscount = cartData?.reduce(
    (acc, item) =>
      acc + (Number(item.mrp) - Number(item.price)) * item.count,
    0
  );



  
  function couponToast() {
    return toast({
      title: `Coupon Applied`,
      status: "success",
      isClosable: true,
      position: "top-right",
    });
  }

  const handleCouponChange = (coupon) => {
    console.log(typeof coupon);
    couponToast();
    onClose();
    setCouponApplied(true);
    setCoupDiscount(Number(coupon));
    setTotal(total - coupon);
  };

  const handleCouponInput = () => {
    couponToast();
    console.log(inputCoupon);
    setCouponApplied(true);
    setInputCoupon("");
    setCoupDiscount(Number(inputCoupon.match(/\d/g).join("")));
    setTotal(total - Number(inputCoupon.match(/\d/g).join("")));
  };

  useEffect(() => {
    dispatch(getCartData());
    setTotal(
      cartData?.reduce((acc, item) => acc + Number(item.price * item.count), 0)
    );
  }, []);

  //decrement
  const handleDecCount=(id,count) =>{
    dispatch(updateCartData(id, count - 1)).then((res)=>{
      dispatch(getCartData())
    })
  }
//increment
const handleIncCount=(id,count)=>{
  dispatch(updateCartData(id, count + 1)).then((res)=>{
    dispatch(getCartData())
  })
}
  
//remove
const handleRemoveCart=(id)=>{
 dispatch(deleteCartData(id)).then((res)=>{
  dispatch(getCartData())
 })
}


  if (cartData.length === 0) {
    return (
      <Text>
        Your Cart is Empty. <Link to="/">Return to Shopping.</Link>
      </Text>
    );
  }

  return (
    <div style={{"paddingTop":"80px", marginBottom:"30%"}}>
      <Flex gap="2" w="80%" m="auto" my="10">
        <Container minW="60%" h="auto" bg="white">
          <Box fontSize="2xl" fontWeight="bold" align="left" mb="4">
            My Cart({cartData?.length})
          </Box>
          <Container
            bgColor="white"
            h="max-content"
            minW="100%"
            borderRadius="4"
            py="0.5"
            my="3"
          >
            <HStack justify="space-between" my="4">
              <Box fontSize="md" fontWeight="semibold">
                Basket ({cartData?.length} Items)
              </Box>
              <Box fontSize="xl" fontWeight="semibold">
                Rs.{(mrpTotal - totalDiscount).toFixed(2)}
              </Box>
            </HStack>
            <VStack divider={<StackDivider borderColor="grey" />}>
              {cartData && cartData?.map((item) => (
               <div key={item.id} style={{display:"flex", justifyContent:"space-around" , gap:"60px"}}>
                <div>
                  <img height="110px" width="110px" src={item.image1}/>

                </div>
                <div>
                 <h2>{item.name}</h2>
                 <p>{item.category}</p>
                 <p style={{color:"gray"}} >discount : {item.discount}</p>
                
                </div>
                <div style={{ display:"block"}}>
                <h3>Price ${item.price}</h3>
                <div style={{ display:"flex", justifyContent:"space-around", alignItems:"center", marginTop:"10px", gap:"8px"}}>
                  <button disabled={item.count === 1} onClick={()=>handleDecCount(item.id, item.count)} style={{border:"1px solid gray", color:"white", fontSize:"14px",  backgroundColor:"#008ecc", width:"30px", borderRadius:"50px"}} >-</button>
                  <button>{item.count}</button>
                  <button onClick={()=>handleIncCount(item.id, item.count)} style={{border:"1px solid gray", color:"white", fontSize:"14px",  backgroundColor:"#008ecc", width:"30px", borderRadius:"50px"}}>+</button>
                </div>
                
                {/* remove */}
                <div style={{ marginTop:"20px"}}>
                  <button  onClick={() => handleRemoveCart(item.id)} style={{borderRadius:"5px", fontSize:"12px",fontWeight:"bold", width:"70px",backgroundColor:"red",color:"white", padding:"4px"}}>Remove</button>
                </div>
                </div>
               </div>
               
                 ))}``
            </VStack>
          </Container>
        </Container>
        <Container maxW="40%">
          <CartOrderPayment />
          <Container bgColor="white" my="8" borderRadius="4" p="5">
            <Flex justify="space-between" align="center">
              <Text fontSize="xl" fontWeight="bold">
                Apply Coupon
              </Text>
              <Text
                color="red"
                fontWeight="semibold"
                fontSize="sm"
                cursor="pointer"
                onClick={onOpen}
              >
                VIEW ALL
              </Text>
              <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                // finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Select Coupons</DrawerHeader>
                  <Divider borderColor="grey" />

                  <DrawerBody>
                    <Text fontSize="lg" fontWeight="500">
                      Coupons
                    </Text>
                    <RadioGroup
                      onChange={handleCouponChange}
                      value={value}
                      my="4"
                    >
                      <Stack direction="column">
                        <Box>
                          <Radio value="250" colorScheme="green">
                            <Text fontWeight="semibold" color="black">
                              SAVE250
                            </Text>
                          </Radio>
                          <Text pl="6">
                            Flat Rs. 250 OFF on fashion products above Rs. 999
                          </Text>
                        </Box>
                        <Divider borderColor="grey" />
                        <Box>
                          <Radio value="1000" colorScheme="black">
                            <Text fontWeight="semibold" color="black">
                              SAVE1000
                            </Text>
                          </Radio>
                          <Text pl="6">
                            Flat Rs. 1000 OFF on Mobile & Electronics purchase
                            above Rs. 10000. Applicable once per user.
                          </Text>
                        </Box>
                        <Divider borderColor="grey" />
                        <Box>
                          <Radio value="200" colorScheme="red">
                            <Text fontWeight="semibold" color="black">
                              ITSPREMIUM200
                            </Text>
                          </Radio>
                          <Text pl="6">
                            Get Rs 200 off on the purchase of Premium Fruits
                            worth Rs 999
                          </Text>
                        </Box>
                        <Divider borderColor="grey" />
                        <Box>
                          <Radio value="100">
                            <Text fontWeight="semibold" color="black">
                              PREMIUMFRUITS100
                            </Text>
                          </Radio>
                          <Text pl="6">
                            Get Rs 100 off on the purchase of Premium Fruits
                            worth Rs 499
                          </Text>
                        </Box>
                      </Stack>
                    </RadioGroup>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Flex>
            <InputGroup my="4">
              <InputLeftElement
                pointerEvents="none"
                children={
                  <Image
                    src="https://www.jiomart.com/msassets/images/icons/offer-grey.svg"
                    w="7"
                    h="7"
                  />
                }
              />
              <Input
                variant="flushed"
                placeholder="Enter Coupon Code"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
              />
              <InputRightElement
                children={
                  <Text
                    fontWeight="500"
                    cursor="pointer"
                    onClick={handleCouponInput}
                  >
                    Apply
                  </Text>
                }
              />
            </InputGroup>
          </Container>
          <Container bgColor="white" borderRadius="4" p="3" mt="10">
            <Text align="left" fontWeight="bold" fontSize="xl" mb="5">
              Payment Details
            </Text>
            <VStack divider={<StackDivider borderColor="grey" />} align="left">
              <Flex justify="space-between" fontWeight="semibold">
                <Text>MRP Total</Text>
                <Text>₹{mrpTotal.toFixed(2)}</Text>
              </Flex>
              <Flex justify="space-between" fontWeight="semibold">
                <Text>Product Discount</Text>
                <Text>₹{totalDiscount.toFixed(2)}</Text>
              </Flex>

              {couponApplied && (
                <Flex justify="space-between" fontWeight="semibold">
                  <Text>Coupon Discount</Text>
                  <Text>₹{coupDiscount}</Text>
                </Flex>
              )}

              <Flex justify="space-between" fontWeight="bold">
                <Text>Total Amount</Text>
                <Text>
                  ₹{(mrpTotal - totalDiscount - coupDiscount).toFixed(2)}
                </Text>
              </Flex>
              <Box align="right" fontWeight="semibold" color="green">
                <Text>
                  You Save ₹{(totalDiscount + coupDiscount).toFixed(2)}
                </Text>
              </Box>
            </VStack>
          </Container>
          <Box align="right" my="3">
            <Link
              to="/order"
              state={{
                mrpTotal: mrpTotal,
                totalDiscount: totalDiscount,
                coupDiscount: coupDiscount,
              }}
            >
              <Button w="55%" colorScheme="teal">
                Place Order
              </Button>
            </Link>

          </Box>
        </Container>
      </Flex>
      {/* <Footer /> */}
    </div>
  );
};

export default CartPage;