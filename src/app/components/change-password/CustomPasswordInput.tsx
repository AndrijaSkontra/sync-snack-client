"use client";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface CustomPasswordInputProps {
  name: string;
  id?: string;
  placeholder?: string;
  value: string; // Added value prop
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Added onChange prop
}

export default function CustomPasswordInput({
  name,
  id,
  placeholder,
  value,
  onChange,
}: CustomPasswordInputProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        name={name}
        id={id || name} // If id is not provided, use name as fallback
        placeholder={placeholder}
        value={value} // Bind value to input field
        onChange={onChange} // Attach onChange handler
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? <EyeIcon className="size-5" /> : <EyeSlashIcon className="size-5" />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
