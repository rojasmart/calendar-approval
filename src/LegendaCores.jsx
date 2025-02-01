import { Box, Flex, Text, HStack } from "@chakra-ui/react";

const captions = [
  { color: "#FF0000", label: "Feriados" },
  { color: "#FFA500", label: "Pontes" },
  { color: "#008000", label: "Férias em aprovação" },
  { color: "#0000FF", label: "Férias parcialmente aprovadas" },
  { color: "#800080", label: "Férias aprovadas" },
  { color: "#FFFF00", label: "Faltas em aprovação" },
  { color: "#00FF00", label: "Faltas parcialmente aprovadas" },
  { color: "#00FFFF", label: "Faltas aprovadas" },
  { color: "#FF00FF", label: "Descanso compensatório em aprovação" },
  { color: "#000000", label: "Descanso compensatório parcialmente aprovado" },
  { color: "#808080", label: "Descanso compensatório aprovado" },
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
