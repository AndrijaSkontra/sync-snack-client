import { Box, Text } from '@chakra-ui/react';

export default function RatingPretty({ rating, desc }: any) {
  return (
    <Box>
      {[...Array(5)].map((_, index) => (
        <Text key={index} as="span">
          {index < rating ? '★' : '☆'}
        </Text>
      ))}
    </Box>
  );
}
