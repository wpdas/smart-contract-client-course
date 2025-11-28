"use client";

import { useEffect, useState } from "react";
import { get_greeting } from "@/services/contract";
import { Box, Heading, HStack, Input, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { walletApi } from "@/services/near";

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const { isSignedIn, isWalletReady } = useWallet();

  useEffect(() => {
    const fetchGreeting = async () => {
      const response = await get_greeting();
      setGreeting(response);
    };

    fetchGreeting();

    const interval = setInterval(() => {
      fetchGreeting();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <HStack
        w="100%"
        justifyContent="flex-end"
        backgroundColor="blue.600"
        p={4}
        boxShadow="md"
        mb="10vh"
      >
        {!isSignedIn ? (
          <Button
            p={4}
            size="md"
            colorScheme="blue"
            onClick={() => walletApi.signInModal()}
            opacity={!isWalletReady ? 0 : 1}
          >
            Connect Wallet
          </Button>
        ) : (
          <Button
            p={4}
            size="md"
            colorPalette="blue"
            variant="subtle"
            onClick={() => walletApi.wallet?.signOut()}
            opacity={!isWalletReady ? 0 : 1}
          >
            Disconnect Wallet
          </Button>
        )}
      </HStack>

      <VStack gap="8">
        <Heading size="2xl" letterSpacing="tight">
          {greeting ? `Greeting: "${greeting}"` : "loading..."}
        </Heading>

        <Box width="100%" height="1px" bg="blue.200" opacity={0.1} />

        <VStack maxWidth="500px" width="100%">
          {isSignedIn && (
            <HStack gap="2" w="100%">
              <Input
                colorPalette="blue"
                placeholder="Enter a new greeting"
                size="lg"
                p={4}
                w="100%"
              />
              <Button p={4} size="md" colorPalette="blue" variant="outline">
                Send
              </Button>
            </HStack>
          )}
        </VStack>
      </VStack>
    </Box>
  );
}
