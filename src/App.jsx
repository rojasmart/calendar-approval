import "./App.css";
import { Heading, Card, CardBody, Flex } from "@chakra-ui/react";
import Selector from "./Selector";

function App() {
  return (
    <>
      <Heading as="h2" size="md">
        Aprovações de Férias
      </Heading>
      <Card mt="5" p="2">
        <CardBody display="flex" flexDirection="column">
          <Selector />
          <Flex>
            {/* <CalendarTable
              funcionarios={funcionariosFiltrados}
              selectedMonth={month}
              selectedYear={year}
              feriasFaltas={feriasFaltas}
              feriasPorAprovar={feriasPorAprovar}
            /> */}
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}

export default App;
