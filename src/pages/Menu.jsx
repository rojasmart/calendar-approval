import React from "react";
import { Button, Center, Heading, Stack, Text, Card, IconButton, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon, SettingsIcon } from "@chakra-ui/icons";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <Box position="relative" minHeight="100vh" bg="gray.100" p={4}>
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
      <Center>
        <Card variant={"filled"} p={8} borderRadius="lg" maxWidth="600px">
          <Heading size="lg" mb={4}>
            Calendar Approval
          </Heading>
          <Text fontSize="md" mb={6} color="gray.500">
            Book and schedule your vacations here. Your requests will be approved by staff management.
          </Text>
          <Stack spacing={8} direction={{ base: "column", md: "row" }} justify="center">
            <Card borderRadius="lg" p={6} textAlign="center" width={["100%", "100%", "45%"]}>
              <Heading size="sm" mb={4} color="gray.600">
                Schedule Vacation
              </Heading>
              <Button colorScheme="teal" rightIcon={<ArrowForwardIcon />} onClick={() => navigate("/schedule")}>
                Book
              </Button>
            </Card>
            <Card borderRadius="lg" p={6} textAlign="center" width={["100%", "100%", "45%"]}>
              <Heading size="sm" mb={4} color="gray.600">
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
