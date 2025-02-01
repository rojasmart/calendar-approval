import React, { useMemo } from "react";
import { Button, Table, Tbody, Td, Tr, Box, Text } from "@chakra-ui/react";
import { normalizeName } from "../../../utils/helpers/utils";

const QuadroAprovacoes = React.memo(({ clickedDayList, selectedYear, handleRemoveItemList, approvedAllDaysList, handleRemoverAllDays }) => {
  const groupedItems = useMemo(() => {
    return clickedDayList.reduce((acc, item) => {
      const name = normalizeName(item.funcionario);
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name].push(item);
      return acc;
    }, {});
  }, [clickedDayList]);

  const groupedApprovedItems = useMemo(() => {
    return approvedAllDaysList.reduce((acc, item) => {
      const name = normalizeName(item.funcionario);
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name].push(item);
      return acc;
    }, {});
  }, [approvedAllDaysList]);

  return (
    <>
      {approvedAllDaysList.length > 0 && (
        <Table variant="unstyled" size="sm" mt="4">
          <Tbody>
            {Object.entries(groupedApprovedItems).map(([name, items]) => (
              <Box key={name} border="1px" borderColor="gray.200" p="4" mb="4">
                <Tr>
                  <Td colSpan={4} style={{ fontWeight: "bold" }}>
                    {name}
                  </Td>
                </Tr>
                <Tr display="flex" justifyContent="space-between">
                  <Td colSpan={4} display="flex" justifyContent="space-between">
                    Aprovar todos os dias ({items.length})
                  </Td>
                  <Button colorScheme="red" size="xs" onClick={() => handleRemoverAllDays(name)}>
                    Remover
                  </Button>
                </Tr>
              </Box>
            ))}
          </Tbody>
        </Table>
      )}
      {clickedDayList.length > 0 && (
        <Table variant="unstyled" size="sm" mt="4">
          <Tbody>
            {Object.entries(groupedItems).map(([name, items]) => (
              <Box key={name} border="1px" borderColor="gray.200" p="4" mb="4">
                <Tr>
                  <Td colSpan={4} style={{ fontWeight: "bold" }}>
                    {name}
                  </Td>
                </Tr>
                {items.map((item, index) => (
                  <Tr key={`${item.day}-${item.month}-${item.funcionario}`}>
                    <Td colSpan={4} display="flex" justifyContent="space-between">
                      {item.day} de {item.month} de {selectedYear && selectedYear}
                      <Button size="xs" colorScheme="red" onClick={() => handleRemoveItemList(index)} style={{ marginLeft: "10px" }}>
                        Remover
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Box>
            ))}
          </Tbody>
        </Table>
      )}
      {approvedAllDaysList.length === 0 && clickedDayList.length === 0 && (
        <Text mt="4" fontSize="md" color="gray.500">
          Sem items selecionados
        </Text>
      )}
    </>
  );
});

QuadroAprovacoes.displayName = "QuadroAprovacoes";

export default QuadroAprovacoes;
