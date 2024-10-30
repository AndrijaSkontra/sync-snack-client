import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  keyframes,
} from "@chakra-ui/react";
import {
  ArrowPathIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

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
        <Tag variant="subtle" colorScheme="yellow">
          <TagLeftIcon boxSize="12px" as={ArrowPathIcon} />
          <TagLabel>In progress</TagLabel>
        </Tag>
      );
    case "COMPLETED":
      return (
        <Tag variant="subtle" colorScheme="blue">
          <TagLeftIcon boxSize="12px" as={CheckCircleIcon} />
          <TagLabel>Completed</TagLabel>
        </Tag>
      );
    case "CANCELLED":
      return (
        <Tag variant="subtle" colorScheme="red">
          <TagLeftIcon boxSize="12px" as={ExclamationCircleIcon} />
          <TagLabel>Cancelled</TagLabel>
        </Tag>
      );
    default:
      return null;
  }
}
