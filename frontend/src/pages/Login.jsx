import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signin } from "../actions/useractions";
import { Layout } from "../Components/Layout";
import { AuthContext } from "../Context/AuthContext";

export default function Loginpage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { isAuth } = useContext(AuthContext);
  const { loading, userInfo, error, isLoggedIn } = userSignin;
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(userInfo);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(name));
  };

  return isAuth ? (
    navigate("/dashboard")
  ) : (
    <Layout>
      <Heading textAlign="center" my={12}>
        Login
      </Heading>

      <Box
        py="8"
        px={{ base: "4", md: "10" }}
        shadow="base"
        rounded={{ sm: "lg" }}
        maxW="md"
        mx="auto"
        mt={4}
      >
        <chakra.form onSubmit={submitHandler}>
          <Stack spacing="6">
            <FormControl id="name">
              <FormLabel>Enter UserName</FormLabel>
              <Input
                name="name"
                type="text"
                autoComplete="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <Button type="submit" colorScheme="pink" size="lg" fontSize="md">
              Sign in
            </Button>
          </Stack>
        </chakra.form>
        <HStack justifyContent="space-between" my={4}>
          <Button variant="link" onClick={() => navigate("/register")}>
            Register
          </Button>
        </HStack>
      </Box>
    </Layout>
  );
}
