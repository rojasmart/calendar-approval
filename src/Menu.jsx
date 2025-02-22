import React from "react";
import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon, CalendarIcon } from "@chakra-ui/icons";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <Center height="100vh">
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={8} textAlign="center" maxWidth="600px">
        <CalendarIcon boxSize={12} mb={4} />
        <Heading size="lg" mb={4}>
          Calendar Approval
        </Heading>
        <Text fontSize="md" mb={6}>
          Book and schedule your vacations here. Your requests will be approved by staff management.
        </Text>
        <Stack spacing={8} direction="row" justify="center">
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} textAlign="center" width="45%">
            <Heading size="md" mb={4}>
              Schedule Vacation
            </Heading>
            <Button colorScheme="teal" rightIcon={<ArrowForwardIcon />} onClick={() => navigate("/schedule-vacation")}>
              Book
            </Button>
          </Box>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} textAlign="center" width="45%">
            <Heading size="md" mb={4}>
              Approve Requests
            </Heading>
            <Button colorScheme="orange" rightIcon={<ArrowForwardIcon />} onClick={() => navigate("/validate-vacation")}>
              Approve
            </Button>
          </Box>
        </Stack>
      </Box>
    </Center>
  );
};

export default Menu;
