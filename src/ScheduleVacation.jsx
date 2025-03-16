import React, { useState } from "react";
import { format, addMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth, isAfter, parseISO } from "date-fns";
import { Box, Button, Container, Flex, Grid, Heading, List, ListItem, Radio, RadioGroup, Stack, Text, useColorModeValue } from "@chakra-ui/react";

const ScheduleVacation = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectionMode, setSelectionMode] = useState("multiple");
  const [currentYear] = useState(new Date().getFullYear());

  const calendarBgColor = useColorModeValue("white", "gray.700");
  const selectedDayBgColor = useColorModeValue("green.500", "green.300");
  const selectedDatesBoxBg = useColorModeValue("gray.50", "gray.700");
  const selectedDatesBorder = useColorModeValue("gray.200", "gray.600");
  const dayBgColor = useColorModeValue("white", "gray.800");
  const dayTextColor = useColorModeValue("gray.800", "gray.100");
  const inactiveTextColor = useColorModeValue("gray.400", "gray.600");
  const hoverBgColor = useColorModeValue("gray.100", "gray.600");

  const handleDateChange = (date) => {
    if (selectionMode === "single") {
      setSelectedDates([date]);
    } else {
      // Check if date already selected
      if (selectedDates.some((d) => isSameDay(d, date))) {
        // Remove date if already selected
        setSelectedDates(selectedDates.filter((d) => !isSameDay(d, date)));
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

  // Generate array of months for the current year
  const months = Array.from({ length: 12 }, (_, i) => {
    return new Date(currentYear, i, 1);
  });

  // Calendar component for a single month
  const Calendar = ({ month }) => {
    const today = new Date();
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // Generate grid of days
    const generateDays = () => {
      let day = startDate;
      const days = [];

      while (day <= endDate) {
        days.push(day);
        day = addDays(day, 1);
      }

      return days;
    };

    const daysList = generateDays();

    return (
      <Box>
        <Box textAlign="center" py={1} fontWeight="bold" fontSize="sm">
          {format(month, "MMMM yyyy")}
        </Box>

        <Grid templateColumns="repeat(7, 1fr)" textAlign="center" fontSize="xs" fontWeight="semibold" mb={1}>
          {daysOfWeek.map((day) => (
            <Box key={day}>{day}</Box>
          ))}
        </Grid>

        <Grid templateColumns="repeat(7, 1fr)" gap={1}>
          {daysList.map((date, i) => {
            const isCurrentMonth = isSameMonth(date, month);
            const isSelected = selectedDates.some((selectedDate) => isSameDay(selectedDate, date));
            const isPastDate = date < today && !isSameDay(date, today);
            const isDisabled = isPastDate;

            return (
              <Box
                key={i}
                onClick={() => !isDisabled && isCurrentMonth && handleDateChange(date)}
                textAlign="center"
                borderRadius="10%"
                py={1}
                cursor={isDisabled || !isCurrentMonth ? "default" : "pointer"}
                bg={isSelected ? selectedDayBgColor : "transparent"}
                color={isSelected ? "white" : !isCurrentMonth ? inactiveTextColor : isDisabled ? inactiveTextColor : dayTextColor}
                opacity={isDisabled || !isCurrentMonth ? 0.5 : 1}
                _hover={!isDisabled && isCurrentMonth && !isSelected ? { bg: hoverBgColor } : {}}
                transition="all 0.2s"
                fontWeight={isSelected ? "bold" : "normal"}
                fontSize={"xs"}
              >
                {format(date, dateFormat)}
              </Box>
            );
          })}
        </Grid>
      </Box>
    );
  };

  return (
    <Container maxW="1800px" py={8}>
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
              <Box key={index} mb={2} borderRadius="md" border="1px solid #EDF2F7 " p={2} bg={calendarBgColor}>
                <Calendar month={month} />
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
            <Text fontSize="xs" mb={6} color="gray.400">
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
