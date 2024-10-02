import { Box, Switch, Tag } from "@chakra-ui/react";

export default async function SettingsPage() {
  return (
    <Box className="flex h-4/5 items-center justify-center">
      <Box className="flex space-x-1">
        <Switch colorScheme="xorange" size="lg" />
        <Tag>Dark Mode</Tag>
      </Box>
    </Box>
  );
}
