"use client";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function MenuLayout() {
  const router = useRouter();
  return (
    <Menu>
      <MenuButton as={HamburgerIcon} boxSize={10}></MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            signOut({
              redirect: true,
              callbackUrl: "/login",
            });
          }}
        >
          Sign out
        </MenuItem>
        <MenuItem onClick={() => router.push("/profile")}>Profile</MenuItem>
      </MenuList>
    </Menu>
  );
}
