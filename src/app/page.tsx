"use client";
import { Button, View, Heading, Flex, Text } from "@aws-amplify/ui-react";
import Chat from "@/components/Chat";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Home() {
  const { user, signOut } = useAuthenticator();

  return (
    <View className="app-container">
      <Flex
        as="header"
        justifyContent="space-between"
        alignItems="center"
        padding="1rem"
      >
        <Text fontWeight="bold">{user?.signInDetails?.loginId}</Text>
        <Heading level={3}>Travel Personal Assistant</Heading>
        <Button onClick={signOut} size="small" variation="destructive">
          Sign out
        </Button>
      </Flex>
      <View as="main">
        <Chat />
      </View>
    </View>
  );
}
