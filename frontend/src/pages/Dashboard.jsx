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
  Flex,
  useColorModeValue,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchNotices } from "../actions/noticeactions";
import { signout } from "../actions/useractions";

export const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, error, NoticesArr } = useSelector((state) => state.notices);
  const { userInfo, isLoggedIn } = userSignin;
  console.log(userInfo);
  console.log(NoticesArr);
  const [notice, setNotice] = useState({
    UserId: "",
    notice_Title: "",
  });
  useEffect(() => {
    dispatch(fetchNotices());
  }, [notice.notice_Title]);

  NoticesArr.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://notice-board-01.herokuapp.com/notices/create", notice);
  };

  return (
    <>
      <Text mt={7} mb={5} textAlign={"center"}>
        Dashboard
      </Text>
      <Flex justifyContent={"space-around"}>
        <Box>
          <chakra.form onClick={handleSubmit}>
            <Flex
              minWidth="max-content"
              alignItems="center"
              gap="2"
              justifyContent={"center"}
            >
              <FormControl id="name">
                <FormLabel>Enter Your message</FormLabel>

                <Textarea
                  onChange={(e) =>
                    setNotice({
                      UserId: userInfo._id,
                      notice_Title: e.target.value,
                    })
                  }
                  placeholder="Here is a sample placeholder"
                  size="sm"
                />
              </FormControl>

              <Button type="submit" colorScheme="pink" fontSize="md" mt={"6"}>
                submit
              </Button>
            </Flex>
          </chakra.form>
        </Box>
        {/* {loading && <Spinner></Spinner>}
            {error && <div>Error occured</div>} */}

        <Box
          bg="blackAlpha.600"
          w="50%"
          p={4}
          borderLeft={"1px solid gray"}
          m={"10px"}
          overflow="auto"
        >
          {NoticesArr.map((notice) => {
            return (
              <>
                <Box mb={"6px"} borderBottom={"1px solid red"} key={notice._id}>
                  <Stack>
                    <Text fontSize={"md"}>{notice.notice_Title}</Text>
                    <br />

                    <Flex justifyContent={"space-between"}>
                      <Text fontSize={"sm"}>{notice.UserId?.name}</Text>
                      <Text fontSize={"sm"}>
                        {new Date(notice.date).toLocaleDateString()}{" "}
                        {new Date(notice.createdAt).toLocaleTimeString()}
                      </Text>
                    </Flex>
                  </Stack>
                </Box>
              </>
            );
          })}
        </Box>
      </Flex>
    </>
  );
};
