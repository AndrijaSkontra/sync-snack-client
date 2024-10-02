import { Box, Text, keyframes } from "@chakra-ui/react";

// Define the keyframes for the shining animation
const shineAnimation = keyframes`
  0% { background-color: #fbbf24; }  /* Normal Yellow */
  50% { background-color: #fcd34d; }  /* Brighter Yellow */
  100% { background-color: #fbbf24; }  /* Back to Normal Yellow */
`;

export default function StatusPretty({ statusType }: any) {
  switch (statusType) {
    case "IN_PROGRESS":
      return (
        <Box className="px-4 py-2 rounded-md text-white bg-yellow-400">
          <Text>In Progress</Text>
        </Box>
      );
    case "COMPLETED":
      return (
        <Box className="px-4 py-2 bg-blue-1 rounded-md text-white bg-green-400">
          <Text>Completed</Text>
        </Box>
      );
    case "CANCELLED":
      return (
        <Box className="px-4 py-2 bg-orange-dark-2 rounded-md text-white bg-red-400">
          <Text>Canceled</Text>
        </Box>
      );
    default:
      return null;
  }
}
