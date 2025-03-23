import React from "react";
import { IconButton, useColorMode, Tooltip } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ColorModeToggle = ({ position = "fixed", top = "4", right = "4", ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip label={colorMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}>
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        size="md"
        position={position}
        top={top}
        right={right}
        isRound={true}
        variant="solid"
        colorScheme={colorMode === "light" ? "purple" : "orange"}
        {...rest}
      />
    </Tooltip>
  );
};

export default ColorModeToggle;
