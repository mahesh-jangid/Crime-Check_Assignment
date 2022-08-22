import React from "react";

import { Container, Heading, Spacer, Box, Flex, Icon } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/useractions";

export function Navbar() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(signout());
    Navigate("/");
  };
  return (
    <>
      <Container maxW="8xl">
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">
            <Heading size="md">App</Heading>
          </Box>
          <Spacer />
          <Flex gap="6" fontSize={"18px"}>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/register">Register</Link>
            {userInfo?.isLoggedIn ? (
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Flex>
        </Flex>
      </Container>
    </>
  );
}
