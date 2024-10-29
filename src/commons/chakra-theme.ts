import { extendTheme } from "@chakra-ui/react";
import "@fontsource/titillium-web";
import "@fontsource/lilita-one";
import "@fontsource/roboto";
import "@fontsource-variable/source-code-pro";

export const theme = extendTheme({
  colors: {
    xblue: {
      200: "hsl(200, 20%, 65%)", // dark mode base color
      300: "hsl(210, 30%, 40%)", // dark mode hover
      400: "hsl(220, 50%, 30%)", // dark mode click
      500: "hsl(250, 100%, 60%)", // white mode base color
      600: "hsl(240, 93%, 40%)", // white mode hover
      700: "hsl(230, 93%, 30%)", // white  mode click
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
      200: "hsl(5, 60%, 65%)", // dark mode base color
      300: "hsl(5, 30%, 40%)", // dark mode hover
      400: "hsl(5, 50%, 30%)", // dark mode click
      500: "hsl(5, 100%, 60%)", // white mode base color
      600: "hsl(5, 93%, 40%)", // white mode hover
      700: "hsl(5, 93%, 30%)", // white  mode click
    },
  },
  fonts: {
    body: `'Roboto', sans-serif`,
    heading: `'Lilita One', system-ui`,
  },
});
