import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Box, Button, Container, Flex, Heading, List, ListItem, Radio, RadioGroup, Stack, Text, useColorModeValue } from "@chakra-ui/react";

const ScheduleVacation = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectionMode, setSelectionMode] = useState("multiple");

  const calendarBgColor = useColorModeValue("white", "gray.700");
  const selectedDayBgColor = useColorModeValue("green.500", "green.300");
  const selectedDatesBoxBg = useColorModeValue("gray.50", "gray.700");
  const selectedDatesBorder = useColorModeValue("gray.200", "gray.600");

  const handleDateChange = (date) => {
    if (selectionMode === "single") {
      setSelectedDates([date]);
    } else {
      // Check if date already selected
      if (selectedDates.some((d) => format(d, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))) {
        // Remove date if already selected
        setSelectedDates(selectedDates.filter((d) => format(d, "yyyy-MM-dd") !== format(date, "yyyy-MM-dd")));
      } else {
        // Add date if not selected
        setSelectedDates([...selectedDates, date]);
      }
    }
  };

  const handleSubmit = () => {
    // Sort dates chronologically
    const sortedDates = [...selectedDates].sort((a, b) => a - b);
    alert(`Vacation request submitted for ${sortedDates.length} days: 
    ${sortedDates.map((date) => format(date, "MMM dd, yyyy")).join(", ")}`);
    // Here you would typically send this data to your backend
  };

  const clearSelection = () => {
    setSelectedDates([]);
  };

  // Custom styles for the date picker to work with Chakra UI
  const customDatePickerStyles = `
    .react-datepicker {
      font-family: inherit;
      background-color: ${calendarBgColor};
      border-radius: 0.375rem;
      border: 1px solid ${selectedDatesBorder};
    }
    .selected-day {
      background-color: ${selectedDayBgColor} !important;
      color: white !important;
      border-radius: 50%;
    }
  `;

  return (
    <Container maxW="800px" py={8}>
      <style>{customDatePickerStyles}</style>

      <Heading as="h2" mb={6} textAlign="center">
        Schedule Your Vacation
      </Heading>

      <Box mb={6}>
        <RadioGroup
          value={selectionMode}
          onChange={(value) => {
            setSelectionMode(value);
            setSelectedDates([]);
          }}
        >
          <Stack direction="row" spacing={5}>
            <Radio value="single">Single Day</Radio>
            <Radio value="multiple">Multiple Days</Radio>
          </Stack>
        </RadioGroup>
      </Box>

      <Box mb={6} p={4} borderRadius="md" boxShadow="sm" bg={calendarBgColor}>
        <DatePicker
          inline
          selected={selectedDates[0]}
          onChange={handleDateChange}
          highlightDates={selectedDates}
          minDate={new Date()}
          dayClassName={(date) => (selectedDates.some((d) => format(d, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")) ? "selected-day" : undefined)}
        />
      </Box>

      {selectedDates.length > 0 && (
        <Box mb={6} p={4} borderRadius="md" bg={selectedDatesBoxBg} border="1px solid" borderColor={selectedDatesBorder}>
          <Heading as="h3" size="md" mb={3}>
            Selected Vacation Days ({selectedDates.length}):
          </Heading>
          <List spacing={2}>
            {[...selectedDates]
              .sort((a, b) => a - b)
              .map((date, index) => (
                <ListItem key={index}>{format(date, "EEEE, MMMM dd, yyyy")}</ListItem>
              ))}
          </List>
        </Box>
      )}

      <Flex gap={4}>
        <Button onClick={clearSelection} isDisabled={selectedDates.length === 0} colorScheme="red" flex="1">
          Clear Selection
        </Button>
        <Button onClick={handleSubmit} isDisabled={selectedDates.length === 0} colorScheme="green" flex="1">
          Submit Vacation Request
        </Button>
      </Flex>
    </Container>
  );
};

export default ScheduleVacation;
