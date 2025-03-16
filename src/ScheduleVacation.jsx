import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addMonths, getYear, setMonth } from "date-fns";
import { Box, Button, Container, Flex, Grid, Heading, List, ListItem, Radio, RadioGroup, Stack, Text, useColorModeValue } from "@chakra-ui/react";

const ScheduleVacation = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectionMode, setSelectionMode] = useState("multiple");
  const [currentYear] = useState(new Date().getFullYear());

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

  // Generate array of months for the year
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(i);
    return date;
  });

  // Custom styles for the date pickers
  const customDatePickerStyles = `
  .react-datepicker {
    font-family: inherit;
    background-color: ${calendarBgColor};
    border-radius: 0.375rem;
    border: 1px solid ${selectedDatesBorder};
    font-size: 0.8rem;
    width: 100%;
  }
  .react-datepicker__month-container {
    width: 100%;
  }
  .react-datepicker__header {
    padding-top: 0.5rem;
    font-size: 0.8rem;
  }
  .react-datepicker__current-month {
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 0.4rem;
  }
  .react-datepicker__day-names {
    margin-top: 0.3rem;
  }
  .react-datepicker__day, .react-datepicker__day-name {
    width: 1.7rem;
    height: 1.7rem;
    line-height: 1.7rem;
    margin: 0.1rem;
    font-size: 0.8rem;
  }
  .react-datepicker__navigation {
    top: 0.5rem;
    height: 1.5rem;
    width: 1.5rem;
    display: none; /* Hide navigation within small calendars */
  }
  .selected-day {
    background-color: ${selectedDayBgColor} !important;
    color: white !important;
    border-radius: 50%;
  }
  
  /* Make it responsive on smaller screens */
  @media (max-width: 768px) {
    .react-datepicker__day, .react-datepicker__day-name {
      width: 1.5rem;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: 0.7rem;
    }
  }
`;

  return (
    <Container maxW="1800px" py={8}>
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

      <Flex direction={{ base: "column", md: "row" }} gap={6} align="flex-start">
        {/* Left side - All 12 months */}
        <Box flex={{ base: "1", md: "9" }} p={4} borderRadius="md" boxShadow="lg" bg={calendarBgColor} overflow="hidden">
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={4}
          >
            {months.map((month, index) => (
              <Box key={index} mb={2}>
                <DatePicker
                  inline
                  selected={null}
                  onChange={handleDateChange}
                  highlightDates={selectedDates}
                  minDate={new Date()}
                  showMonthYearPicker={false}
                  showFullMonthYearPicker={false}
                  showTwoColumnMonthYearPicker={false}
                  openToDate={month}
                  renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                    <Box textAlign="center" py={1}>
                      {format(date, "MMMM yyyy")}
                    </Box>
                  )}
                  dayClassName={(date) =>
                    selectedDates.some((d) => format(d, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")) ? "selected-day" : undefined
                  }
                  fixedHeight
                />
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Right side - Selected dates and actions */}
        <Box
          flex={{ base: "1", md: "2" }}
          p={4}
          borderRadius="md"
          bg={selectedDatesBoxBg}
          border="1px solid"
          borderColor={selectedDatesBorder}
          boxShadow="md"
        >
          <Heading as="h3" size="md" mb={5}>
            Selected Vacation Days ({selectedDates.length})
          </Heading>

          {selectedDates.length > 0 ? (
            <List spacing={2} maxH="400px" overflowY="auto" mb={6}>
              {[...selectedDates]
                .sort((a, b) => a - b)
                .map((date, index) => (
                  <ListItem key={index}>{format(date, "EEEE, MMMM dd, yyyy")}</ListItem>
                ))}
            </List>
          ) : (
            <Text mb={6} color="gray.500">
              No days selected yet. Click on the dates you'd like to take vacation.
            </Text>
          )}

          <Stack spacing={4}>
            <Button onClick={clearSelection} isDisabled={selectedDates.length === 0} colorScheme="red" width="full">
              Clear Selection
            </Button>
            <Button onClick={handleSubmit} isDisabled={selectedDates.length === 0} colorScheme="green" width="full">
              Submit Vacation Request
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
};

export default ScheduleVacation;
