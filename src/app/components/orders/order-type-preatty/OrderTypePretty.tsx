import { Box, Image, Text } from "@chakra-ui/react";
import { IoBeerOutline } from "react-icons/io5";
import { IoFastFoodOutline } from "react-icons/io5";
import { VscCoffee } from "react-icons/vsc";

export default function OrderTypePretty({ orderType }: any) {
  switch (orderType) {
    case "COFFEE":
      return <VscCoffee className="size-7" />;
    case "ALL":
      return <Image src="/orange_drink.png" alt="mix" boxSize="30px" />;
    case "FOOD":
      return <IoFastFoodOutline className="size-7" />;
    case "BEVERAGE":
      return <IoBeerOutline className="size-7" />;
    default:
      return null;
  }
}
