import { extendTheme, Input } from "@chakra-ui/react";
import "@fontsource/titillium-web";
import "@fontsource/lilita-one";

export const theme = extendTheme({
  colors: {
    xblue: {
      100: "#759feb",
      200: "#618ad4",
      300: "#5b86d4",
      400: "#5078bf",
      500: "#15408c",
      600: "#0d2b68",
      700: "#000000",
    },
    xorange: {
      100: "#edb591",
      200: "#edab80",
      300: "#f0a87a",
      400: "#d98068", // dark mode onClick color
      500: "#f2a470",
      600: "#d98068",
      700: "#8c3331",
    },
    xred: {
      100: "#bd6a68",
      200: "#bd6a68",
      300: "#bd6a68",
      400: "#bd6a68",
      500: "#8c3331",
      600: "#681615",
      700: "#000000",
    },
  },
  fonts: {
    body: `'Titillium Web', sans-serif`,
    heading: `'Lilita One', system-ui`,
  },
});
