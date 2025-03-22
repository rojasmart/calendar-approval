import { Box, Flex, Text, HStack } from "@chakra-ui/react";

const captions = [
  { color: "red.200", label: "Holidays" },
  { color: "green.100", label: "Vacation in approval" },
  { color: "green.300", label: "Vacation parcial approved" },
  { color: "green.600", label: "Vacation approved" },
];

const LegendaCores = () => {
  return (
    <HStack align="start" spacing={3} mt="4" color="gray.500" flexWrap="wrap">
      {captions.map((caption, index) => (
        <Flex key={index} align="center">
          <Box width="20px" height="20px" backgroundColor={caption.color} mr="2" borderRadius="xl"></Box>
          <Text fontSize="sm">{caption.label}</Text>
        </Flex>
      ))}
    </HStack>
  );
};

export default LegendaCores;
