import React, { useMemo } from "react";
import { Button, Table, Tbody, Td, Tr, Box, Text, Alert } from "@chakra-ui/react";
import { normalizeName } from "./Utils";

const QuadroAprovacoes = React.memo(({ approvedDay, approvedAllDaysList, handleRemoveAllDays, handleRemoveDay, isChefia }) => {
  const groupedItems = useMemo(() => {
    return approvedDay.reduce((acc, item) => {
      const name = normalizeName(item.funcionarioNome);
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name].push(item);
      return acc;
    }, {});
  }, [approvedDay]);

  const groupedApprovedItems = useMemo(() => {
    return approvedAllDaysList.reduce((acc, item) => {
      const name = normalizeName(item.funcionarioNome);
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name].push(item);
      return acc;
    }, {});
  }, [approvedAllDaysList]);

  const itemsListWithApproval = Object.entries(groupedApprovedItems).map(([name, items]) => {
    const approved = items.every((item) => item.approved);
    return { name, items, approved };
  });

  const itemsWithApproval = Object.entries(groupedItems).map(([name, items]) => {
    const approved = items.every((item) => item.approved);
    return { name, items, approved };
  });

  return (
    <>
      {approvedAllDaysList.length > 0 && (
        <Table variant="unstyled" size="sm" mt="4">
          <Tbody>
            {itemsListWithApproval.map(({ name, items, approved }) => (
              <Box key={name} border="1px" borderColor="gray.200" p="4" mb="4">
                <Tr>
                  <Td colSpan={4} style={{ fontWeight: "bold" }}>
                    {name}
                  </Td>
                </Tr>
                <Tr display="flex" justifyContent="space-between">
                  <Td colSpan={4} display="flex" justifyContent="space-between" alignItems={"center"}>
                    <Text>
                      {approved ? "Aprovar todos os dias" : "Rejeitar todos os dias"}{" "}
                      <Text as="b" display="inline" color={approved ? "green.500" : "red.500"}>
                        Qtd Dias ({items.length})
                      </Text>
                    </Text>
                  </Td>
                  <Button size="xs" colorScheme="red" onClick={() => handleRemoveAllDays(name)}>
                    Remover
                  </Button>
                </Tr>
              </Box>
            ))}
          </Tbody>
        </Table>
      )}
      {approvedDay.length > 0 && (
        <Table variant="unstyled" size="sm" mt="4">
          <Tbody>
            {itemsWithApproval.map(({ name, items }) => (
              <Box key={name} border="1px" borderColor="gray.200" p="4" mb="4">
                <Tr>
                  <Td colSpan={4} style={{ fontWeight: "bold" }}>
                    {name}
                  </Td>
                </Tr>
                {items.map((item, index) => (
                  <Tr key={`${item.day}-${item.month}-${item.funcionario}`} display={"block"}>
                    <Td colSpan={4} display="flex" justifyContent="space-between" alignItems={"center"}>
                      <Text>
                        {item.approved ? "Dias a aprovar" : "Dia a rejeitar"}{" "}
                        <Text as="b" display="inline" color={item.approved ? "green.500" : "red.500"}>
                          {new Date(item.dataInicio).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                        </Text>
                      </Text>
                      <Button size="xs" colorScheme="red" onClick={() => handleRemoveDay(index)}>
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
      {approvedAllDaysList.length === 0 && approvedDay.length === 0 && (
        <Text mt="4" fontSize="md" color="gray.500">
          Sem items selecionados
        </Text>
      )}
      {isChefia && <Alert colorScheme="red">Não é necessário submeter na tabela Chefia</Alert>}
    </>
  );
});

QuadroAprovacoes.displayName = "QuadroAprovacoes";

export default QuadroAprovacoes;
