"use client";

import { useEffect, useState } from "react";
import { get_greeting, set_greeting } from "@/services/contract";
import { Box, Heading, HStack, Input, Link, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { walletApi } from "@/services/near";
import { CONTRACT_ID } from "@/constants/envs";

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const [newGreeting, setNewGreeting] = useState("");
  const [sending, setSending] = useState(false);
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

  const handleSendGreeting = async () => {
    setSending(true);
    const response = await set_greeting({ greeting: newGreeting });
    console.log(response);

    // Update greeting
    setGreeting(newGreeting);
    setNewGreeting("");
    setSending(false);
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <HStack
        w="100%"
        justifyContent="space-between"
        backgroundColor="blue.600"
        p={4}
        boxShadow="md"
        mb="10vh"
      >
        {/* Transactions History */}
        <Button p={4} size="md">
          <Link
            href={`https://testnet.nearblocks.io/address/${CONTRACT_ID}`}
            target="_blank"
          >
            Transactions History
          </Link>
        </Button>

        {/* Connect / Disconnect Wallet */}
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
                value={newGreeting}
                onChange={(e) => setNewGreeting(e.target.value)}
                disabled={sending}
              />
              <Button
                p={4}
                size="md"
                colorPalette="blue"
                variant="outline"
                onClick={handleSendGreeting}
                disabled={!newGreeting || newGreeting.length === 0}
                loading={sending}
              >
                Send
              </Button>
            </HStack>
          )}
        </VStack>
      </VStack>
    </Box>
  );
}
