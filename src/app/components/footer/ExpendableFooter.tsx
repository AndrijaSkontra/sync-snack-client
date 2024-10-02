"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Flex,
  useTheme,
  Button,
  Collapse,
  ScaleFade,
} from "@chakra-ui/react";
import SignOutButton from "./SignOutButton";
import FooterLanguageButtons from "./FooterLanguageButtons";
import SwitchColorThemeButton from "./SwitchColorThemeButton";
import { SettingsIcon, CloseIcon } from "@chakra-ui/icons";

interface ExpandableFooterProps {
  isSignOutButtonVisible: boolean;
}

const ExpandableFooter: React.FC<ExpandableFooterProps> = ({
  isSignOutButtonVisible,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const footerRef = useRef<HTMLDivElement>(null);

  // Close the footer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        footerRef.current &&
        !footerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <>
      <Collapse in={isExpanded} animateOpacity>
        <Box
          ref={footerRef}
          position="fixed"
          bottom={12} // Adjusted to make room for the icon button
          left="50%"
          transform="translateX(-50%)"
          width="80%" // Smaller width for dropdown
          maxWidth="400px"
          p={4}
          boxShadow="0 -2px 10px rgba(0, 0, 0, 0.3)"
          zIndex={1000}
          borderRadius="md" // Rounded corners for the dropdown
          transition="all 0.3s ease-in-out"
        >
          <Flex justify="space-between" align="center">
            <ScaleFade initialScale={0.9} in={isSignOutButtonVisible}>
              {isSignOutButtonVisible && <SignOutButton />}
            </ScaleFade>
            <FooterLanguageButtons />
            <SwitchColorThemeButton />
            <IconButton
              aria-label="Close settings"
              icon={<CloseIcon />}
              onClick={() => setIsExpanded(false)}
              colorScheme="xblue"
              _hover={{
                transform: "rotate(90deg)", // Spins in place when hovered
              }}
              transition="all 0.3s ease"
              size="sm"
            />
          </Flex>
        </Box>
      </Collapse>
      <ScaleFade in={!isExpanded}>
        <IconButton
          position="fixed"
          bottom={4}
          left={4} // Positioned in the bottom-left corner
          aria-label="Open settings"
          icon={<SettingsIcon />}
          onClick={() => setIsExpanded(true)}
          colorScheme="xblue"
          boxShadow="0 2px 8px rgba(0, 0, 0, 0.2)"
          _hover={{
            transform: "rotate(90deg)",
          }} // Spins in place when hovered
          transition="all 0.3s ease"
          zIndex={1000}
          size="md"
        />
      </ScaleFade>
    </>
  );
};

export default ExpandableFooter;
