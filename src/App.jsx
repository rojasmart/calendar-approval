import "./App.css";
import { useState, useCallback, useEffect, useMemo } from "react";
import {
  Heading,
  Card,
  CardBody,
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
} from "@chakra-ui/react";

import { normalizeName } from "./Utils";

import CalendarioTable from "./CalendarioTable";
import QuadroAprovacoes from "./QuadroAprovacoes";
import LegendaCores from "./LegendaCores";

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]; // Example months
const years = [2021, 2022, 2023, 2024, 2025]; // Example years
const orders = ["Ascending", "Descending"]; // Example orders

function App() {
  const [department, setDepartment] = useState("Todos");
  const [month, setMonth] = useState("Todos");
  const [year, setYear] = useState("2024");
  const [order, setOrder] = useState("");

  const [funcionariosFiltrados, setFuncionariosFiltrados] = useState([]);

  const departamentos = [
    { id: 1, nome: "Recursos Humanos", idAlternativo: "rh" },
    { id: 2, nome: "Marketing", idAlternativo: "marketing" },
    { id: 3, nome: "Tecnologia", idAlternativo: "tecnologia" },
    { id: 4, nome: "Financeiro", idAlternativo: "financeiro" },
  ];
  const funcionarios = [
    { id: "002", nomeAbreviado: "João José" },
    { id: "003", nomeAbreviado: "Maria Dinis" },
    { id: "004", nomeAbreviado: "José Martins" },
    { id: "005", nomeAbreviado: "Ana Ceuta" },
    { id: "006", nomeAbreviado: "Pedro Matoso" },
    { id: "007", nomeAbreviado: "Marta Brasão" },
    { id: "008", nomeAbreviado: "Carlos Fim" },
    { id: "009", nomeAbreviado: "Sofia Fininha" },
    { id: "010", nomeAbreviado: "Rui Mercedes" },
    { id: "011", nomeAbreviado: "Teresa Bragança" },
    { id: "012", nomeAbreviado: "Miguel Macedo" },
    { id: "013", nomeAbreviado: "Diana Pereira" },
    { id: "014", nomeAbreviado: "Ricardo Mendes" },
    { id: "015", nomeAbreviado: "Inês Pimenta" },
    { id: "016", nomeAbreviado: "Hugo Cardoso" },
    { id: "017", nomeAbreviado: "Catarina Gouveia" },
  ];
  const feriasFaltas = [
    {
      id: 9,
      funcionarioId: "002",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-01-07T00:00:00",
      dataFim: "2025-01-28T00:00:00",
      sequencia: null,
      diaParcial: null,
      periodo: "",
      tipoFalta: "Ferias",
      nota: "Solicitação para dia 28 de janeiro",
      comprovativo: null,
      aprovacoes: {
        aprovadorFuncionarioId: 62,
        aprovadoFuncionario: true,
        dataAprovacaoFuncionario: null,
        aprovadorGestorId: null,
        aprovadoGestor: null,
        dataAprovacaoGestor: null,
        aprovadorRHId: null,
        aprovadoRH: null,
        dataAprovacaoRH: null,
        dataPedidoAprovacao: "2025-01-22T09:23:01.40268",
        objetoId: 0,
        tipoEntidadeAprocacao: null,
        justificacaoFuncionario: null,
        justificacaoGestor: null,
        justificacaoRH: null,
      },
    },
    {
      id: 10,
      funcionarioId: "002",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-01-09T00:00:00",
      dataFim: "2025-01-29T00:00:00",
      sequencia: null,
      diaParcial: null,
      periodo: "",
      tipoFalta: "Ferias",
      nota: "Solicitação para dia 28 de janeiro",
      comprovativo: null,
      aprovacoes: {
        aprovadorFuncionarioId: 62,
        aprovadoFuncionario: true,
        dataAprovacaoFuncionario: null,
        aprovadorGestorId: null,
        aprovadoGestor: null,
        dataAprovacaoGestor: null,
        aprovadorRHId: null,
        aprovadoRH: null,
        dataAprovacaoRH: null,
        dataPedidoAprovacao: "2025-01-22T09:23:01.40268",
        objetoId: 0,
        tipoEntidadeAprocacao: null,
        justificacaoFuncionario: null,
        justificacaoGestor: null,
        justificacaoRH: null,
      },
    },
    {
      id: 11,
      funcionarioId: "003",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-01-15T00:00:00",
      dataFim: "2025-01-15T00:00:00",
      sequencia: null,
      diaParcial: null,
      periodo: "",
      tipoFalta: "Ferias",
      nota: "Solicitação para dia 28 de janeiro",
      comprovativo: null,
      aprovacoes: {
        aprovadorFuncionarioId: 62,
        aprovadoFuncionario: true,
        dataAprovacaoFuncionario: null,
        aprovadorGestorId: null,
        aprovadoGestor: null,
        dataAprovacaoGestor: null,
        aprovadorRHId: null,
        aprovadoRH: null,
        dataAprovacaoRH: null,
        dataPedidoAprovacao: "2025-01-22T09:23:01.40268",
        objetoId: 0,
        tipoEntidadeAprocacao: null,
        justificacaoFuncionario: null,
        justificacaoGestor: null,
        justificacaoRH: null,
      },
    },
    {
      id: 12,
      funcionarioId: "003",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-01-02T00:00:00",
      dataFim: "2025-01-02T00:00:00",
      sequencia: null,
      diaParcial: null,
      periodo: "",
      tipoFalta: "Ferias",
      nota: "Solicitação para dia 28 de janeiro",
      comprovativo: null,
      aprovacoes: {
        aprovadorFuncionarioId: 62,
        aprovadoFuncionario: true,
        dataAprovacaoFuncionario: null,
        aprovadorGestorId: null,
        aprovadoGestor: null,
        dataAprovacaoGestor: null,
        aprovadorRHId: null,
        aprovadoRH: null,
        dataAprovacaoRH: null,
        dataPedidoAprovacao: "2025-01-22T09:23:01.40268",
        objetoId: 0,
        tipoEntidadeAprocacao: null,
        justificacaoFuncionario: null,
        justificacaoGestor: null,
        justificacaoRH: null,
      },
    },
    {
      id: 12,
      funcionarioId: "004",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-01-10T00:00:00",
      dataFim: "2025-01-02T00:00:00",
      sequencia: null,
      diaParcial: null,
      periodo: "",
      tipoFalta: "Ferias",
      nota: "Solicitação para dia 28 de janeiro",
      comprovativo: null,
      aprovacoes: {
        aprovadorFuncionarioId: 62,
        aprovadoFuncionario: true,
        dataAprovacaoFuncionario: null,
        aprovadorGestorId: null,
        aprovadoGestor: null,
        dataAprovacaoGestor: null,
        aprovadorRHId: null,
        aprovadoRH: null,
        dataAprovacaoRH: null,
        dataPedidoAprovacao: "2025-01-22T09:23:01.40268",
        objetoId: 0,
        tipoEntidadeAprocacao: null,
        justificacaoFuncionario: null,
        justificacaoGestor: null,
        justificacaoRH: null,
      },
    },
    {
      id: 0,
      funcionarioId: "002",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-01-02T00:00:00",
      dataFim: "2024-01-02T00:00:00",
      sequencia: 7032,
      diaParcial: false,
      periodo: "",
      tipoFalta: "Ferias",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "002",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-01-24T00:00:00",
      dataFim: "2024-01-23T12:00:00",
      sequencia: 7032,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "002",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-02-06T00:00:00",
      dataFim: "2024-02-05T12:00:00",
      sequencia: 7075,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "002",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-03-06T00:00:00",
      dataFim: "2024-03-05T12:00:00",
      sequencia: 7116,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "002",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-04-23T00:00:00",
      dataFim: "2024-04-22T12:00:00",
      sequencia: 7206,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "002",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-05-21T00:00:00",
      dataFim: "2024-05-20T12:00:00",
      sequencia: 7208,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "002",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-05-22T00:00:00",
      dataFim: "2024-05-21T12:00:00",
      sequencia: 7208,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "002",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-06-11T00:00:00",
      dataFim: "2024-06-10T12:00:00",
      sequencia: 7252,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "002",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-06-19T00:00:00",
      dataFim: "2024-06-18T12:00:00",
      sequencia: 7252,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "003",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-01-10T00:00:00",
      dataFim: "2024-07-08T12:00:00",
      sequencia: 7296,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "004",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-01-16T00:00:00",
      dataFim: "2024-07-08T12:00:00",
      sequencia: 7296,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "004",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-01-12T00:00:00",
      dataFim: "2024-07-08T12:00:00",
      sequencia: 7296,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "005",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-01-04T00:00:00",
      dataFim: "2024-07-08T12:00:00",
      sequencia: 7296,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "005",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-01-07T00:00:00",
      dataFim: "2024-07-08T12:00:00",
      sequencia: 7296,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "006",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-01-18T00:00:00",
      dataFim: "2024-07-08T12:00:00",
      sequencia: 7296,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
    {
      id: 0,
      funcionarioId: "006",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2024-01-14T00:00:00",
      dataFim: "2024-07-08T12:00:00",
      sequencia: 7296,
      diaParcial: true,
      periodo: "",
      tipoFalta: "Falta",
      nota: "Originou Falta",
      comprovativo: null,
      aprovacoes: null,
    },
  ];

  //Aprove single day
  const [dayClicked, setDayClicked] = useState(null);
  const [monthClicked, setMonthClicked] = useState(null);
  const [funcionarioIdClicked, setFuncionarioIdClicked] = useState(null);
  const [clickedDayList, setClickedDayList] = useState([]);

  //Aprove all days
  const [approvedAllDays, setApprovedAllDays] = useState([]);
  const [approvedAllDaysList, setApprovedAllDaysList] = useState([]);

  //Modal list logic
  const [isModalOpenQuadroAprovacoes, setIsModalOpenQuadroAprovacoes] = useState(false);

  const { isOpen, onToggle } = useDisclosure();

  //Filtro para ferias aprovadas e ferias por aprovar
  const feriasAprovadas = useMemo(() => {
    return feriasFaltas.filter((feria) => !feria.aprovacoes || Object.keys(feria.aprovacoes).length === 0);
  }, [feriasFaltas]);

  const feriasPorAprovar = useMemo(() => {
    return feriasFaltas.filter((feria) => feria.aprovacoes && Object.keys(feria.aprovacoes).length > 0);
  }, [feriasFaltas]);

  //Day clicked logic
  useEffect(() => {
    if (dayClicked && monthClicked && funcionarioIdClicked) {
      const funcionario = funcionarios.find((f) => f.id === funcionarioIdClicked);
      setClickedDayList((prevList) => [...prevList, { day: dayClicked, month: monthClicked, funcionario: funcionario.nomeAbreviado }]);
    }
  }, [dayClicked, monthClicked, funcionarioIdClicked, funcionarios]);

  useEffect(() => {
    if (approvedAllDays.length > 0) {
      const newApprovedDays = approvedAllDays.map((dayInfo) => {
        const funcionario = funcionarios.find((f) => f.id === dayInfo.funcionarioId);
        return {
          day: dayInfo.day,
          month: dayInfo.month,
          funcionario: funcionario ? funcionario.nomeAbreviado : "",
        };
      });

      setApprovedAllDaysList((prevList) => {
        const filteredNewApprovedDays = newApprovedDays.filter(
          (newDayInfo) => !prevList.some((prevDayInfo) => prevDayInfo.funcionario === newDayInfo.funcionario)
        );
        return [...prevList, ...filteredNewApprovedDays];
      });
    }
  }, [approvedAllDays]);

  useEffect(() => {
    if (department === "Todos") {
      setFuncionariosFiltrados(funcionarios);
    } else {
      const filteredFuncionarios = funcionarios.filter((funcionario) => funcionario.departamentoId === department);
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

  const handleRemoveItemList = useCallback((index) => {
    setClickedDayList((prevList) => prevList.filter((_, i) => i !== index));
  }, []);

  const handleRemoverAllDays = (name) => {
    setApprovedAllDaysList((prevList) =>
      prevList.filter((item) => {
        const currentName = item.funcionario ? normalizeName(item.funcionario) : "";
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
          <ModalHeader>Quadro de Aprovações</ModalHeader>
          <ModalBody>
            <QuadroAprovacoes
              dayClicked={dayClicked}
              monthClicked={monthClicked}
              funcionarioIdClicked={funcionarioIdClicked}
              setDayClicked={setDayClicked}
              setMonthClicked={setMonthClicked}
              setFuncionarioIdClicked={setFuncionarioIdClicked}
              clickedDayList={clickedDayList}
              approvedAllDaysList={approvedAllDaysList}
              selectedYear={year}
              handleRemoveItemList={handleRemoveItemList}
              handleRemoverAllDays={handleRemoverAllDays}
            />
          </ModalBody>
          <ModalFooter>
            <Button size="sm" colorScheme="gray" mr={3} onClick={handleCloseModalQuadroAprovacoes}>
              Cancelar
            </Button>
            <Button size="sm" colorScheme="green" mr={3} isDisabled={clickedDayList.length === 0 && approvedAllDaysList.length === 0}>
              Submeter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Heading as="h2" size="md">
        Aprovações de Férias
      </Heading>
      <Card mt="5" p="2">
        <CardBody display="flex" flexDirection="column">
          <Flex mb="4" justifyContent="space-between" gap="6">
            <Box w="50%" display="flex" gap="4">
              <Select cursor="pointer" size="sm" placeholder="Departamento" value={department} onChange={handleChangeDepartamento}>
                <option value="Todos">Todos</option>
                {departamentos.map((departamento) => (
                  <option key={departamento.id} value={departamento.idAlternativo}>
                    {normalizeName(departamento.nome)}
                  </option>
                ))}
              </Select>
              <Select cursor="pointer" size="sm" placeholder="Mês" onChange={handleChangeMonth}>
                <option value="Todos">Todos</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </Select>
              <Select cursor="pointer" size="sm" placeholder="Ano" value={year} onChange={handleChangeYear}>
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
              <Select cursor="pointer" size="sm" placeholder="Ordem" value={order} onChange={(e) => setOrder(e.target.value)}>
                {orders.map((order, index) => (
                  <option key={index} value={order}>
                    {order}
                  </option>
                ))}
              </Select>
            </Box>
            <Box w="50%" display="flex" justifyContent="flex-end" gap="4">
              <Button size="sm" colorScheme="blue" onClick={onToggle}>
                Legenda
              </Button>
              <ButtonGroup size="sm">
                <Button
                  size="sm"
                  colorScheme="orange"
                  onClick={handleOpenModalQuadroAprovacoes}
                  isDisabled={clickedDayList.length === 0 && approvedAllDaysList.length === 0}
                >
                  Quadro Aprovações
                </Button>
                <IconButton aria-label="clicked list" icon={<Text>{clickedDayList.length || approvedAllDaysList.length}</Text>} />
              </ButtonGroup>
            </Box>
          </Flex>
          <Flex direction={["column"]} gap="6">
            <CalendarioTable
              funcionarios={funcionariosFiltrados}
              selectedMonth={month}
              selectedYear={year}
              feriasAprovadas={feriasAprovadas}
              feriasPorAprovar={feriasPorAprovar}
              setDayClicked={setDayClicked}
              setMonthClicked={setMonthClicked}
              setFuncionarioIdClicked={setFuncionarioIdClicked}
              setApprovedAllDays={setApprovedAllDays}
            />
          </Flex>
          <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
            <Box p="20px" color="white" mt="4" bg="#f5f5f5" shadow="md">
              <LegendaCores />
            </Box>
          </Slide>
        </CardBody>
      </Card>
    </>
  );
}

export default App;
