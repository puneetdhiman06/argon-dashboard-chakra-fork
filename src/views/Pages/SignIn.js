import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom"; 
import signInImage from "assets/img/signInImage.png";

function SignIn() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");

  // States for username, password, and error handling
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Use useHistory to programmatically navigate
  const history = useHistory();

  const handleLogin = async () => {
    setError(null); // Clear previous errors

    try {
      const response = await fetch("https://vmware.0.staging.xpponet.in/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          password: "Pankaj143@", // Adding the password from the header as specified
        },
        body: JSON.stringify({
          username: "molarband_admin", // You can replace this with dynamic input if needed
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      const access_token = data.access_token;
      const userDetail = data.user_details

      if (access_token && userDetail) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user_details", JSON.stringify(userDetail));
        history.push("/admin/dashboard");
      } else {
        throw new Error("Access token not found in response");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <Flex position="relative">
      <Flex
        h={{ sm: "100vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        pt={{ md: "0px" }}
      >
        <Flex
          w="100%"
          h="100%"
          alignItems="center"
          justifyContent="center"
          mt={{ base: "50px", md: "20px" }}
        >
          <Flex
            zIndex="2"
            direction="column"
            w="445px"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
            bg={bgForm}
            boxShadow={useColorModeValue("0px 5px 14px rgba(0, 0, 0, 0.05)", "unset")}
          >
            <Text fontSize="sm" color={textColor} textAlign="center" mb="10px">
              Welcome to Xpponet
            </Text>
            <Text fontSize="xl" color={textColor} fontWeight="bold" textAlign="center" mb="22px">
              Login
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Username
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="Your username"
                mb="24px"
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel>
              <Input
                variant="auth"
                fontSize="sm"
                ms="4px"
                type="password"
                placeholder="Your password"
                mb="24px"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <Text color="red.500" mb="24px">{error}</Text>}
              <Button
                fontSize="10px"
                variant="dark"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                onClick={handleLogin}
              >
                Login
              </Button>
            </FormControl>
          </Flex>
        </Flex>
        <Box
          overflowX="hidden"
          h="100%"
          w="100%"
          left="0px"
          position="absolute"
          bgImage={`url(${signInImage})`}
          bgRepeat="no-repeat"
          bgPosition="center"
          bgSize="cover"
        >
          <Box w="100%" h="100%" bg="blue.500" opacity="0.8"></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
