import { Box, Image, Text } from '@chakra-ui/react';

export default function OrderTypePretty({ orderType }: any) {
  switch (orderType) {
    case "COFFEE":
      return (
        <Image src='/coffee_green_circle.png' alt='coffee' boxSize='30px' />
      );
    case "ALL":
      return (
        <Image src='/orange_drink.png' alt='mix' boxSize='30px' />
      );
    case "FOOD":
      return (
        <Image src='/pizza.png' alt='food' boxSize='30px' />
      );
    case "DRINKS":
      return (
        <Image src='/beer.png' alt='drinks' boxSize='30px' />
      );
    default:
      return null;
  }
}
