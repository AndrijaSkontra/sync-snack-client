import { extendTheme } from "@chakra-ui/react";
import "@fontsource/titillium-web";
import "@fontsource/lilita-one";
import "@fontsource/roboto";
import "@fontsource-variable/source-code-pro";

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
      100: "hsl(40, 93%, 25%)", // dark mode base color
      200: "hsl(4, 93%, 25%)", // dark mode base color
      300: "#890b0b", // dark mode hover
      400: "#af0e0e", // dark mode click
      500: "#d51111", // white mode base color
      600: "#ff3314", // white mode hover
      700: "#ff4213", // white  mode click
      800: "hsl(40, 93%, 25%)", // dark mode base color
      900: "hsl(40, 93%, 25%)", // dark mode base color
    },
  },
  fonts: {
    body: `'Roboto', sans-serif`,
    heading: `'Lilita One', system-ui`,
  },
});
