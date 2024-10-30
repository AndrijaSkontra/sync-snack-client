"use client";

export function ThemeCheckProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log(localStorage.getItem("chakra-ui-color-mode"), "before");
  // if (localStorage.getItem("chakra-ui-color-mode")) {
  //   if (localStorage.getItem("chakra-ui-color-mode") === "dark") {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }
  // console.log(localStorage.getItem("chakra-ui-color-mode"), "after");

  return <>{children}</>;
}
