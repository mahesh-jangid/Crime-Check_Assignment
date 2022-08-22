import {
  Box,
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useNavigate } from "react-router-dom";
import { register } from "../actions/useractions";
import { Layout } from "../Components/Layout";

export default function Registerpage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(register(name, password));
  };

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Register
      </Heading>

      <Box
        bg={useColorModeValue("white", "gray.700")}
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
            <FormControl id="email">
              <FormLabel>UserName</FormLabel>
              <Input
                name="text"
                type="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                autoComplete="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button type="submit" colorScheme="pink" size="lg" fontSize="md">
              Sign up
            </Button>
          </Stack>
        </chakra.form>
      </Box>

      <Center my={4}>
        <Button variant="link" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Center>
    </Layout>
  );
}
