"use client";

import { useEffect, useState } from "react";
import { get_greeting } from "@/services/contract";
import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import { useWallet } from "@/hooks/useWallet";

export default function Home() {
  const [greeting, setGreeting] = useState("...");
  const { isSignedIn } = useWallet();

  useEffect(() => {
    const fetchGreeting = async () => {
      const response = await get_greeting();
      setGreeting(response);
    };

    fetchGreeting();

    const interval = setInterval(() => {
      fetchGreeting();
      console.log("Fetching greeting");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box textAlign="center" fontSize="xl" pt="30vh">
      <VStack gap="8">
        <Heading size="2xl" letterSpacing="tight">
          Greeting: {greeting}
        </Heading>

        <Box width="100%" height="1px" bg="gray.200" />

        <VStack maxWidth="500px" width="100%">
          {isSignedIn && (
            <>
              <Input placeholder="Enter a new greeting" size="lg" p={4} />
              <Button p={4} size="lg" colorScheme="blue">
                Set Greeting
              </Button>
            </>
          )}

          {/* {!isSignedIn && (
            <Button
              p={4}
              size="lg"
              colorScheme="blue"
              onClick={() => walletApi.signInModal()}
            >
              Connect Wallet to set greeting
            </Button>
          )} */}
        </VStack>
      </VStack>
    </Box>
  );
}
