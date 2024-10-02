"use client";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function PasswordInput() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Password"
        name="password"
        id="password"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? (
            <EyeIcon className="size-5" />
          ) : (
            <EyeSlashIcon className="size-5" />
          )}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
