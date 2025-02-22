import "./index.css";
import { useState, useCallback, useEffect, useMemo } from "react";
import {
  Flex,
  useDisclosure,
  Select,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Slide,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Text,
} from "@chakra-ui/react";

import { normalizeName } from "./Utils";

import CalendarioTable from "./CalendarioTable";
import QuadroAprovacoes from "./QuadroAprovacoes";
import LegendaCores from "./LegendaCores";

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]; // Example months
const years = [2021, 2022, 2023, 2024, 2025]; // Example years
const orders = ["Ascending", "Descending"]; // Example orders

function App() {
  const [department, setDepartment] = useState("All");
  const [month, setMonth] = useState("All");
  const [year, setYear] = useState("2024");
  const [order, setOrder] = useState("");

  // Check if is chefia
  const [isChefia, setIsChefia] = useState(false);

  const [funcionariosFiltrados, setFuncionariosFiltrados] = useState([]);

  //Hooks data
  const [departamentos, setDepartamentos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [feriasFaltas, setFeriasFaltas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const departamentosResponse = await fetch("/src/data/departamentos.json");
      const funcionariosResponse = await fetch("/src/data/funcionarios.json");
      const feriasFaltasResponse = await fetch(`/src/data/${year}.json`);

      const departamentosData = await departamentosResponse.json();
      const funcionariosData = await funcionariosResponse.json();
      const feriasFaltasData = await feriasFaltasResponse.json();

      setDepartamentos(departamentosData);
      setFuncionarios(funcionariosData);
      setFeriasFaltas(feriasFaltasData);
    };

    fetchData();
  }, [year]); // Add year as a dependency

  //Aprove single day
  const [dayClicked, setDayClicked] = useState(null);
  const [approvedDay, setApprovedDay] = useState([]);

  //Aprove all days
  const [approvedAllDays, setApprovedAllDays] = useState([]);
  const [approvedAllDaysList, setApprovedAllDaysList] = useState([]);

  //Modal list logic
  const [isModalOpenQuadroAprovacoes, setIsModalOpenQuadroAprovacoes] = useState(false);

  const { isOpen, onToggle } = useDisclosure();

  //Filter days approved and days for approval
  const daysApproved = useMemo(() => {
    return feriasFaltas.filter((dias) => !dias.aprovacoes || Object.keys(dias.aprovacoes).length === 0);
  }, [feriasFaltas]);

  const daysForApproval = useMemo(() => {
    return feriasFaltas.filter((dias) => dias.aprovacoes && Object.keys(dias.aprovacoes).length > 0);
  }, [feriasFaltas]);

  //Day clicked logic
  useEffect(() => {
    if (dayClicked) {
      const funcionario = funcionarios.find((f) => f.id === dayClicked.funcionarioId);
      dayClicked.funcionarioId = funcionario.idAlternativo;
      dayClicked.funcionarioNome = funcionario.nomeAbreviado;
      setApprovedDay((prevList) => [...prevList, { ...dayClicked }]);
    }
  }, [dayClicked, funcionarios]);

  useEffect(() => {
    if (approvedAllDays) {
      const newApprovedDays = approvedAllDays.map((day) => {
        const funcionario = funcionarios.find((f) => f.id === day.funcionarioId);
        return {
          ...day,
          funcionarioNome: funcionario.nomeAbreviado,
        };
      });

      setApprovedAllDaysList((prevList) => {
        const filteredNewApprovedDays = newApprovedDays.filter(
          (approvedDays) => !prevList.some((prevDay) => prevDay.funcionarioNome === approvedDays.funcionarioNome)
        );
        return [...prevList, ...filteredNewApprovedDays];
      });
    }
  }, [approvedAllDays]);

  useEffect(() => {
    if (department === "All") {
      setFuncionariosFiltrados(funcionarios);
    } else {
      const filteredFuncionarios = funcionarios.filter((funcionario) => funcionario.departamentoId === department && department);
      setFuncionariosFiltrados(filteredFuncionarios);
    }
  }, [department, funcionarios]);

  const handleChangeDepartamento = useCallback((e) => {
    setDepartment(e.target.value);
  }, []);

  const handleChangeMonth = useCallback((e) => {
    setMonth(e.target.value);
  }, []);

  const handleChangeYear = useCallback((e) => {
    setYear(e.target.value);
  }, []);

  const handleRemoveDay = useCallback((index) => {
    setApprovedDay((prevList) => prevList.filter((_, i) => i !== index));
  }, []);

  const handleRemoveAllDays = (name) => {
    setApprovedAllDaysList((prevList) =>
      prevList.filter((item) => {
        const currentName = item.funcionarioNome ? normalizeName(item.funcionarioNome) : "";
        return currentName !== name;
      })
    );
    setApprovedAllDays([]);
  };

  //Use useDisclosure to open and close the modal
  const handleOpenModalQuadroAprovacoes = useCallback(() => setIsModalOpenQuadroAprovacoes(true), []);
  const handleCloseModalQuadroAprovacoes = useCallback(() => setIsModalOpenQuadroAprovacoes(false), []);

  return (
    <>
      <Modal isOpen={isModalOpenQuadroAprovacoes} onClose={handleCloseModalQuadroAprovacoes} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>To Approve</ModalHeader>
          <ModalBody>
            <QuadroAprovacoes
              approvedDay={approvedDay}
              approvedAllDaysList={approvedAllDaysList}
              handleRemoveDay={handleRemoveDay}
              handleRemoveAllDays={handleRemoveAllDays}
              isChefia={isChefia}
            />
          </ModalBody>
          <ModalFooter>
            <Button size="sm" colorScheme="gray" mr={3} onClick={handleCloseModalQuadroAprovacoes}>
              Cancel
            </Button>
            <Button
              size="sm"
              colorScheme="green"
              mr={3}
              isDisabled={approvedDay.length === 0 && approvedAllDaysList.length === 0}
              onClick={() => handleSubmitFerias()}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex mb="4" justifyContent="space-between" gap="6">
        <Box w="50%" display="flex" gap="4">
          <Select cursor="pointer" size="sm" placeholder="Departamento" value={department} onChange={handleChangeDepartamento}>
            <option value="All">All</option>
            {departamentos.map((departamento) => (
              <option key={departamento.id} value={departamento.idAlternativo}>
                {normalizeName(departamento.nome)}
              </option>
            ))}
          </Select>
          <Select cursor="pointer" size="sm" placeholder="Month" onChange={handleChangeMonth}>
            <option value="All">All</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </Select>
          <Select cursor="pointer" size="sm" placeholder="Year" value={year} onChange={handleChangeYear}>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </Select>
          <Select cursor="pointer" size="sm" placeholder="Order" value={order} onChange={(e) => setOrder(e.target.value)}>
            {orders.map((order, index) => (
              <option key={index} value={order}>
                {order}
              </option>
            ))}
          </Select>
        </Box>
        <Box w="50%" display="flex" justifyContent="flex-end" gap="4">
          <Button size="sm" colorScheme="gray" onClick={onToggle}>
            Caption
          </Button>
          <ButtonGroup size="sm">
            <Button
              size="sm"
              colorScheme="green"
              onClick={handleOpenModalQuadroAprovacoes}
              isDisabled={approvedDay.length === 0 && approvedAllDaysList.length === 0}
            >
              To Approve
            </Button>
            <IconButton aria-label="clicked list" icon={<Text>{approvedDay.length + approvedAllDaysList.length}</Text>} />
          </ButtonGroup>
        </Box>
      </Flex>
      <Flex direction={["column"]} gap="6">
        <CalendarioTable
          funcionarios={funcionariosFiltrados}
          selectedMonth={month}
          selectedYear={year}
          daysApproved={daysApproved}
          daysForApproval={daysForApproval}
          setDayClicked={setDayClicked}
          setApprovedAllDays={setApprovedAllDays}
        />
      </Flex>
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Box p="20px" color="white" mt="4" bg="#f5f5f5" shadow="md">
          <LegendaCores />
        </Box>
      </Slide>
    </>
  );
}

export default App;
