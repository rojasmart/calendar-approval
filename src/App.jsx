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
    {
      id: 0,
      nome: "GONÇALO MANUEL GUEDES FIGUEIREDO VEIGA",
      dataNascimento: "1970-10-25T00:00:00",
      email: "goncalo.veiga@gonksys.com",
      telemovel: "919998530",
      chefiaId: null,
      departamentoId: "001",
      situacao: "001",
      nomeAbreviado: "GONÇALO VEIGA",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "001",
      inativo: false,
      isProtected: false,
    },
    {
      id: 0,
      nome: "ANA CRISTINA SILVA OLIVEIRA NEVES",
      dataNascimento: "1972-11-17T00:00:00",
      email: "cristina.neves@gonksys.com",
      telemovel: "919998560",
      chefiaId: "002",
      departamentoId: "002",
      situacao: "001",
      nomeAbreviado: "CRISTINA NEVES",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "002",
      inativo: false,
      isProtected: false,
    },
    {
      id: 0,
      nome: "ANGELINA ROSA PASSOS VIEIRA",
      dataNascimento: "1964-08-25T00:00:00",
      email: null,
      telemovel: null,
      chefiaId: null,
      departamentoId: "002",
      situacao: "007",
      nomeAbreviado: "ANGELINA VIEIRA",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "003",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "JORGE MANUEL TEIXEIRA DOS SANTOS",
      dataNascimento: "1969-01-11T00:00:00",
      email: "jorge.santos@gonksys.com",
      telemovel: "919998561",
      chefiaId: "044",
      departamentoId: "003",
      situacao: "001",
      nomeAbreviado: "JORGE SANTOS",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "004",
      inativo: false,
      isProtected: false,
    },
    {
      id: 0,
      nome: "JORGE MANUEL PEREIRA ALVES",
      dataNascimento: "1973-03-02T00:00:00",
      email: null,
      telemovel: "919998563",
      chefiaId: null,
      departamentoId: "003",
      situacao: "007",
      nomeAbreviado: "JORGE ALVES",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "005",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "OLINDO SILVESTRE GUIMARÃES VIEIRA",
      dataNascimento: "1974-09-04T00:00:00",
      email: null,
      telemovel: "965100624",
      chefiaId: null,
      departamentoId: "004",
      situacao: "007",
      nomeAbreviado: "OLINDO VIEIRA",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "006",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "OVÍDIO PEDRO PEREIRA RIBEIRO",
      dataNascimento: "1977-01-25T00:00:00",
      email: null,
      telemovel: "911980956",
      chefiaId: null,
      departamentoId: "004",
      situacao: "007",
      nomeAbreviado: "PEDRO RIBEIRO",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "007",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "HÉLDER BRUNO MOREIRA COELHO",
      dataNascimento: "1982-03-06T00:00:00",
      email: "helder.coelho@gonksys.com",
      telemovel: "911980957",
      chefiaId: "041",
      departamentoId: "004",
      situacao: "005",
      nomeAbreviado: "HÉLDER COELHO",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "008",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "TIAGO CABRAL MAIO MOLINOS",
      dataNascimento: "1979-08-24T00:00:00",
      email: "tiago.molinos@gonksys.com",
      telemovel: "911981058",
      chefiaId: "044",
      departamentoId: "003",
      situacao: "001",
      nomeAbreviado: "TIAGO MOLINOS",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "009",
      inativo: false,
      isProtected: false,
    },
    {
      id: 0,
      nome: "GUILHERME CARDINAL DA CONCEIÇÃO FERRAZ",
      dataNascimento: "1985-09-05T00:00:00",
      email: "guilherme.ferraz@gonksys.com",
      telemovel: "919998559",
      chefiaId: "056",
      departamentoId: "004",
      situacao: "005",
      nomeAbreviado: "GUILHERME FERRAZ",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "010",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "PATRÍCIA DANIELA CARDOSO DA SILVA MOURA",
      dataNascimento: "1982-05-07T00:00:00",
      email: null,
      telemovel: null,
      chefiaId: null,
      departamentoId: "003",
      situacao: "007",
      nomeAbreviado: "PATRÍCIA MOURA",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "011",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "TIAGO FILIPE DA COSTA NORONHA MOREIRA",
      dataNascimento: "1982-10-13T00:00:00",
      email: "tiago.moreira@gonksys.com",
      telemovel: "916885100",
      chefiaId: "041",
      departamentoId: "004",
      situacao: "005",
      nomeAbreviado: "TIAGO MOREIRA",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "012",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "NATHALIE TEIXEIRA FERNANDES",
      dataNascimento: "1984-08-09T00:00:00",
      email: null,
      telemovel: null,
      chefiaId: null,
      departamentoId: "003",
      situacao: "007",
      nomeAbreviado: "NATHALIE FERNANDES",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "013",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "VANESSA VALE PINTO",
      dataNascimento: "1984-03-23T00:00:00",
      email: null,
      telemovel: null,
      chefiaId: null,
      departamentoId: "003",
      situacao: "005",
      nomeAbreviado: "VANESSA VALE",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "014",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "NUNO GIL MARQUES NOBRE",
      dataNascimento: "1982-08-12T00:00:00",
      email: "nuno.nobre@gonksys.com",
      telemovel: "916885074",
      chefiaId: "041",
      departamentoId: "004",
      situacao: "005",
      nomeAbreviado: "NUNO NOBRE",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "015",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "GILBERTO MOUTINHO",
      dataNascimento: "1980-04-14T00:00:00",
      email: null,
      telemovel: null,
      chefiaId: null,
      departamentoId: "003",
      situacao: "007",
      nomeAbreviado: "GILBERTO MOUTINHO",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "016",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "RUI MIGUEL MOREIRA FERREIRA TABORDA",
      dataNascimento: "1981-06-28T00:00:00",
      email: null,
      telemovel: "916721433",
      chefiaId: null,
      departamentoId: "003",
      situacao: "007",
      nomeAbreviado: "RUI TABORDA",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "017",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "ANTÓNIO JOSÉ SOUSA MONTEIRO",
      dataNascimento: "1973-03-13T00:00:00",
      email: "antonio.monteiro@gonksys.com",
      telemovel: "933004411",
      chefiaId: "044",
      departamentoId: "003",
      situacao: "001",
      nomeAbreviado: "ANTÓNIO MONTEIRO",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "018",
      inativo: false,
      isProtected: false,
    },
    {
      id: 0,
      nome: "NUNO JORGE MACHADO FERREIRA",
      dataNascimento: "1975-07-20T00:00:00",
      email: null,
      telemovel: "916885096",
      chefiaId: null,
      departamentoId: "003",
      situacao: "007",
      nomeAbreviado: "NUNO FERREIRA",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "019",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "CÉSAR AUGUSTO RIBEIRO DOS SANTOS",
      dataNascimento: "1991-07-02T00:00:00",
      email: "cesar.santos@gonksys.com",
      telemovel: "914526641",
      chefiaId: "041",
      departamentoId: "004",
      situacao: "005",
      nomeAbreviado: "CÉSAR SANTOS",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "020",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "TÂNIA SOFIA CARVALHO FERNANDES",
      dataNascimento: "1987-10-05T00:00:00",
      email: "tania.fernandes@gonksys.com",
      telemovel: "913431355",
      chefiaId: "021",
      departamentoId: "002",
      situacao: "005",
      nomeAbreviado: "TÂNIA FERNANDES",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "021",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "GONÇALO MANUEL DUARTE LOURENÇO",
      dataNascimento: "1990-12-01T00:00:00",
      email: "gmdlourenço@gmail.com",
      telemovel: "916355107",
      chefiaId: null,
      departamentoId: "004",
      situacao: "007",
      nomeAbreviado: "GONÇALO LOURENÇO",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "022",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "PEDRO NELSON SOARES MACHADO",
      dataNascimento: "1981-01-11T00:00:00",
      email: "pedro.machado@sapo.pt",
      telemovel: "933686843",
      chefiaId: null,
      departamentoId: "003",
      situacao: "007",
      nomeAbreviado: "PEDRO MACHADO",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "023",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "MIGUEL ÂNGELO SOARES",
      dataNascimento: "1979-04-05T00:00:00",
      email: "miguel.soares@gonksys.com",
      telemovel: "914833833",
      chefiaId: null,
      departamentoId: "003",
      situacao: "007",
      nomeAbreviado: "MIGUEL SOARES",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "024",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "RICARDO NUNO AZEVEDO MARCIANO",
      dataNascimento: "1984-05-14T00:00:00",
      email: "ricardo.marciano@gonksys.com",
      telemovel: "936822853",
      chefiaId: null,
      departamentoId: "003",
      situacao: "007",
      nomeAbreviado: "RICARDO MARCIANO",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "025",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "CATARINA DOS SANTOS BARROS",
      dataNascimento: "1994-06-30T00:00:00",
      email: "catarina.barros@gonksys.com",
      telemovel: "936946531",
      chefiaId: null,
      departamentoId: "003",
      situacao: "005",
      nomeAbreviado: "CATARINA BARROS",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "026",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "FRANCISCO XAVIER GAGLIARDINI GRAÇA DA SILVEIRA MONTENEGRO",
      dataNascimento: "1982-02-06T00:00:00",
      email: "francisco.montenegro@gonksys.com",
      telemovel: "913934324",
      chefiaId: null,
      departamentoId: "003",
      situacao: "007",
      nomeAbreviado: "FRANCISCO MONTENEGRO",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "027",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "CLAÚDIA SUSANA FERREIRA SERRA ALVES ALELUIA",
      dataNascimento: "1973-09-02T00:00:00",
      email: "claudia.aleluia@gonksys.com",
      telemovel: null,
      chefiaId: null,
      departamentoId: "003",
      situacao: "007",
      nomeAbreviado: "CLAÚDIA ALELUIA",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "028",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "SUSANA ISABEL BAPTISTA DUARTE HENRIQUES",
      dataNascimento: "1986-10-30T00:00:00",
      email: "susana.henriques@gonksys.com",
      telemovel: null,
      chefiaId: "044",
      departamentoId: "003",
      situacao: "001",
      nomeAbreviado: "SUSANA HENRIQUES",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "029",
      inativo: false,
      isProtected: false,
    },
    {
      id: 0,
      nome: "CARLA SOFIA DA SILVA LOPES",
      dataNascimento: "1985-07-07T00:00:00",
      email: null,
      telemovel: "915884658",
      chefiaId: null,
      departamentoId: null,
      situacao: "008",
      nomeAbreviado: "CARLA LOPES",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "030",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "VÂNIA ALEXANDRA RIBEIRO DE SOUSA",
      dataNascimento: "1978-10-26T00:00:00",
      email: null,
      telemovel: "916241448",
      chefiaId: null,
      departamentoId: null,
      situacao: "008",
      nomeAbreviado: "VÂNIA SOUSA",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "031",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "ANTÓNIO MIGUEL FERREIRA DOS SANTOS",
      dataNascimento: "1969-10-18T00:00:00",
      email: "miguel.santos@gonksys.com",
      telemovel: "917262853",
      chefiaId: "041",
      departamentoId: "004",
      situacao: "005",
      nomeAbreviado: "MIGUEL SANTOS",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "032",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "DANIEL PIMENTA RIBEIRO",
      dataNascimento: "1980-10-05T00:00:00",
      email: "daniel.ribeiro@gonksys.com",
      telemovel: "930422870",
      chefiaId: null,
      departamentoId: "004",
      situacao: "007",
      nomeAbreviado: "DANIEL RIBEIRO",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "033",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "FREDERICO FILIPE DA FONSECA NASCIMENTO",
      dataNascimento: "1993-08-26T00:00:00",
      email: "frederico.nascimento@gonksys.com",
      telemovel: "919408047",
      chefiaId: "041",
      departamentoId: "004",
      situacao: "005",
      nomeAbreviado: "FREDERICO NASCIMENTO",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "034",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "JOÃO MIGUEL DE CARVALHO OLIVEIRA",
      dataNascimento: "1985-12-05T00:00:00",
      email: "joao.oliveira@gonksys.com",
      telemovel: null,
      chefiaId: null,
      departamentoId: "003",
      situacao: "005",
      nomeAbreviado: "JOÃO OLIVEIRA",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "035",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "BÁRBARA DANIELA CARVALHO LEMOS RIBEIRO PACHECO",
      dataNascimento: "1983-09-05T00:00:00",
      email: "barbara.pacheco@gonksys.com",
      telemovel: "915235606",
      chefiaId: null,
      departamentoId: "004",
      situacao: "007",
      nomeAbreviado: "BÁRBARA PACHECO",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "036",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "PEDRO MIGUEL GONÇALVES PEREIRA",
      dataNascimento: "1993-07-18T00:00:00",
      email: "pedro.pereira@gonksys.com",
      telemovel: null,
      chefiaId: null,
      departamentoId: "003",
      situacao: "007",
      nomeAbreviado: "PEDRO PEREIRA",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "037",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "LUÍS FILIPE SOARES FERREIRA",
      dataNascimento: "1972-06-24T00:00:00",
      email: "luis.ferreira@gonksys.com",
      telemovel: "913 935 069",
      chefiaId: null,
      departamentoId: "004",
      situacao: "007",
      nomeAbreviado: "LUÍS FERREIRA",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "038",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "SÉRGIO LUÍS VIEIRA GOMES DIAS",
      dataNascimento: "1978-12-28T00:00:00",
      email: "sergio.dias@gonksys.com",
      telemovel: "936 498 544",
      chefiaId: null,
      departamentoId: "004",
      situacao: "005",
      nomeAbreviado: "SÉRGIO DIAS",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "039",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "MARIA JOÃO DOS SANTOS TEIXEIRA",
      dataNascimento: "1993-07-25T00:00:00",
      email: "maria.teixeira@gonksys.com",
      telemovel: "910265106",
      chefiaId: "056",
      departamentoId: "004",
      situacao: "005",
      nomeAbreviado: "MARIA TEIXEIRA",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "040",
      inativo: true,
      isProtected: false,
    },
    {
      id: 0,
      nome: "NUNO FILIPE DA ROCHA NOGUEIRA",
      dataNascimento: "1978-12-13T00:00:00",
      email: "nuno.nogueira@gonksys.com",
      telemovel: "913 346 318",
      chefiaId: "041",
      departamentoId: "004",
      situacao: "005",
      nomeAbreviado: "NUNO NOGUEIRA",
      tituloId: null,
      funcionarioFicha: null,
      idAlternativo: "041",
      inativo: true,
      isProtected: false,
    },
  ];
  const feriasFaltas = [
    {
      id: 12,
      funcionarioId: "044",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2025-03-03T00:00:00",
      dataFim: "2025-03-03T00:00:00",
      diaParcial: null,
      periodo: "",
      tipoFalta: "Ferias",
      nota: "Solicitação de férias para o dia 03/03/2025",
      comprovativo: null,
      aprovacoes: {
        aprovadorFuncionarioId: 80,
        aprovadoFuncionario: true,
        dataAprovacaoFuncionario: null,
        aprovadorGestorId: null,
        aprovadoGestor: null,
        dataAprovacaoGestor: null,
        aprovadorRHId: null,
        aprovadoRH: null,
        dataAprovacaoRH: null,
        dataPedidoAprovacao: "2025-01-27T19:06:50.876069",
        objetoId: 0,
        tipoEntidadeAprocacao: null,
        justificacaoFuncionario: null,
        justificacaoGestor: null,
        justificacaoRH: null,
      },
      anoReferencia: 2025,
    },
    {
      id: 13,
      funcionarioId: "044",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2025-03-04T00:00:00",
      dataFim: "2025-03-04T00:00:00",
      diaParcial: null,
      periodo: "",
      tipoFalta: "Ferias",
      nota: "Solicitação de férias para o dia 04/03/2025",
      comprovativo: null,
      aprovacoes: {
        aprovadorFuncionarioId: 80,
        aprovadoFuncionario: true,
        dataAprovacaoFuncionario: null,
        aprovadorGestorId: null,
        aprovadoGestor: null,
        dataAprovacaoGestor: null,
        aprovadorRHId: null,
        aprovadoRH: null,
        dataAprovacaoRH: null,
        dataPedidoAprovacao: "2025-01-27T19:06:50.950331",
        objetoId: 0,
        tipoEntidadeAprocacao: null,
        justificacaoFuncionario: null,
        justificacaoGestor: null,
        justificacaoRH: null,
      },
      anoReferencia: 2025,
    },
    {
      id: 14,
      funcionarioId: "056",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2025-02-06T00:00:00",
      dataFim: "2025-02-06T00:00:00",
      diaParcial: null,
      periodo: "",
      tipoFalta: "Ferias",
      nota: "Solicitação de férias para o dia 06/02/2025",
      comprovativo: null,
      aprovacoes: {
        aprovadorFuncionarioId: 56,
        aprovadoFuncionario: true,
        dataAprovacaoFuncionario: null,
        aprovadorGestorId: null,
        aprovadoGestor: null,
        dataAprovacaoGestor: null,
        aprovadorRHId: null,
        aprovadoRH: null,
        dataAprovacaoRH: null,
        dataPedidoAprovacao: "2025-01-31T11:21:59.828054",
        objetoId: 0,
        tipoEntidadeAprocacao: null,
        justificacaoFuncionario: null,
        justificacaoGestor: null,
        justificacaoRH: null,
      },
      anoReferencia: 2025,
    },
    {
      id: 15,
      funcionarioId: "056",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2025-02-07T00:00:00",
      dataFim: "2025-02-07T00:00:00",
      diaParcial: null,
      periodo: "",
      tipoFalta: "Ferias",
      nota: "Solicitação de férias para o dia 07/02/2025",
      comprovativo: null,
      aprovacoes: {
        aprovadorFuncionarioId: 56,
        aprovadoFuncionario: true,
        dataAprovacaoFuncionario: null,
        aprovadorGestorId: null,
        aprovadoGestor: null,
        dataAprovacaoGestor: null,
        aprovadorRHId: null,
        aprovadoRH: null,
        dataAprovacaoRH: null,
        dataPedidoAprovacao: "2025-01-31T11:22:01.583674",
        objetoId: 0,
        tipoEntidadeAprocacao: null,
        justificacaoFuncionario: null,
        justificacaoGestor: null,
        justificacaoRH: null,
      },
      anoReferencia: 2025,
    },
    {
      id: 16,
      funcionarioId: "061",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2025-01-03T00:00:00",
      dataFim: "2025-01-03T00:00:00",
      diaParcial: null,
      periodo: "",
      tipoFalta: "Ferias",
      nota: "Solicitação de férias para o dia 03/03/2025",
      comprovativo: null,
      aprovacoes: {
        aprovadorFuncionarioId: 61,
        aprovadoFuncionario: true,
        dataAprovacaoFuncionario: null,
        aprovadorGestorId: null,
        aprovadoGestor: null,
        dataAprovacaoGestor: null,
        aprovadorRHId: null,
        aprovadoRH: null,
        dataAprovacaoRH: null,
        dataPedidoAprovacao: "2025-01-31T11:23:30.492214",
        objetoId: 0,
        tipoEntidadeAprocacao: null,
        justificacaoFuncionario: null,
        justificacaoGestor: null,
        justificacaoRH: null,
      },
      anoReferencia: 2025,
    },
    {
      id: 17,
      funcionarioId: "061",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2025-01-04T00:00:00",
      dataFim: "2025-01-04T00:00:00",
      diaParcial: null,
      periodo: "",
      tipoFalta: "Ferias",
      nota: "Solicitação de férias para o dia 04/03/2025",
      comprovativo: null,
      aprovacoes: {
        aprovadorFuncionarioId: 61,
        aprovadoFuncionario: true,
        dataAprovacaoFuncionario: null,
        aprovadorGestorId: null,
        aprovadoGestor: null,
        dataAprovacaoGestor: null,
        aprovadorRHId: null,
        aprovadoRH: null,
        dataAprovacaoRH: null,
        dataPedidoAprovacao: "2025-01-31T11:23:32.671402",
        objetoId: 0,
        tipoEntidadeAprocacao: null,
        justificacaoFuncionario: null,
        justificacaoGestor: null,
        justificacaoRH: null,
      },
      anoReferencia: 2025,
    },
    {
      id: 18,
      funcionarioId: "061",
      funcionario: null,
      funcionarioNome: null,
      dataInicio: "2025-03-05T00:00:00",
      dataFim: "2025-03-05T00:00:00",
      diaParcial: null,
      periodo: "",
      tipoFalta: "Ferias",
      nota: "Solicitação de férias para o dia 05/03/2025",
      comprovativo: null,
      aprovacoes: {
        aprovadorFuncionarioId: 61,
        aprovadoFuncionario: true,
        dataAprovacaoFuncionario: null,
        aprovadorGestorId: null,
        aprovadoGestor: null,
        dataAprovacaoGestor: null,
        aprovadorRHId: null,
        aprovadoRH: null,
        dataAprovacaoRH: null,
        dataPedidoAprovacao: "2025-01-31T11:23:33.82009",
        objetoId: 0,
        tipoEntidadeAprocacao: null,
        justificacaoFuncionario: null,
        justificacaoGestor: null,
        justificacaoRH: null,
      },
      anoReferencia: 2025,
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
