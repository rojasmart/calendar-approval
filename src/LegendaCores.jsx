import { Box, Flex, Text, HStack } from "@chakra-ui/react";

const captions = [
  { color: "red.200", label: "Feriados" },
  { color: "orange.400", label: "Pontes" },
  { color: "green.100", label: "Férias em aprovação" },
  { color: "green.300", label: "Férias parcialmente aprovadas" },
  { color: "green.600", label: "Férias aprovadas" },
  { color: "red.100", label: "Faltas em aprovação" },
  { color: "red.300", label: "Faltas parcialmente aprovadas" },
  { color: "red.600", label: "Faltas aprovadas" },
  { color: "cyan.100", label: "Descanso compensatório em aprovação" },
  { color: "cyan.300", label: "Descanso compensatório parcialmente aprovado" },
  { color: "cyan.600", label: "Descanso compensatório aprovado" },
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
