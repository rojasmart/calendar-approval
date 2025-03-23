import React from "react";
import { Button, Center, Heading, Stack, Text, Card, IconButton, Box, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon, SettingsIcon } from "@chakra-ui/icons";
import ColorModeToggle from "../components/ColorModeToggle";

const Menu = () => {
  const navigate = useNavigate();

  // Responsive color values that change based on color mode
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.700");
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box position="relative" minHeight="100vh" p={4}>
      {/* Settings and ColorModeToggle buttons */}
      <IconButton
        position="absolute"
        top={4}
        right={4}
        isRound={true}
        variant="solid"
        colorScheme="blue"
        aria-label="Settings"
        fontSize="20px"
        icon={<SettingsIcon />}
        onClick={() => navigate("/settings")}
      />

      <ColorModeToggle position="absolute" top="4" right="16" />

      <Center>
        <Card variant="filled" p={8} borderRadius="lg" maxWidth="600px">
          <Heading size="lg" mb={4} color={headingColor}>
            Calendar Approval
          </Heading>
          <Text fontSize="md" mb={6} color={textColor}>
            Book and schedule your vacations here. Your requests will be approved by staff management.
          </Text>
          <Stack spacing={8} direction={{ base: "column", md: "row" }} justify="center">
            <Card borderRadius="lg" p={6} textAlign="center" width={["100%", "100%", "45%"]} bg={cardBg}>
              <Heading size="sm" mb={4} color={textColor}>
                Schedule Vacation
              </Heading>
              <Button colorScheme="teal" rightIcon={<ArrowForwardIcon />} onClick={() => navigate("/schedule")}>
                Book
              </Button>
            </Card>
            <Card borderRadius="lg" p={6} textAlign="center" width={["100%", "100%", "45%"]} bg={cardBg}>
              <Heading size="sm" mb={4} color={textColor}>
                Approve Requests
              </Heading>
              <Button colorScheme="orange" rightIcon={<ArrowForwardIcon />} onClick={() => navigate("/validate")}>
                Approve
              </Button>
            </Card>
          </Stack>
        </Card>
      </Center>
    </Box>
  );
};

export default Menu;
