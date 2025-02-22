import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";

import { normalizeName } from "./Utils";
import {
  Tag,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  PopoverFooter,
  Button,
  ButtonGroup,
  Heading,
  Flex,
  Spinner,
  Box,
  IconButton,
} from "@chakra-ui/react";

import { CheckCircleIcon, NotAllowedIcon } from "@chakra-ui/icons";

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const monthMap = {
  Janeiro: 1,
  Fevereiro: 2,
  Março: 3,
  Abril: 4,
  Maio: 5,
  Junho: 6,
  Julho: 7,
  Agosto: 8,
  Setembro: 9,
  Outubro: 10,
  Novembro: 11,
  Dezembro: 12,
};

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const CalendarCells = React.memo(({ month, setHoveredMonth, funcionarioId, filteredApproved, filteredForApproval, setDayClicked }) => {
  const [openPopoverIndex, setOpenPopoverIndex] = useState(null);
  const [approvedDays, setApprovedDays] = useState([]);
  const memoizedMatches = useMemo(() => {
    return days.map((day) => {
      const foundApproved = filteredApproved?.find((falta) => {
        const d = new Date(falta.dataInicio);
        return falta.funcionarioId === funcionarioId && d.getDate() === day && d.getMonth() + 1 === monthMap[month];
      });
      const foundPending = filteredForApproval?.find((falta) => {
        const d = new Date(falta.dataInicio);
        return falta.funcionarioId === funcionarioId && d.getDate() === day && d.getMonth() + 1 === monthMap[month];
      });

      const foundParcialApproved = filteredForApproval?.find((falta) => {
        const d = new Date(falta.dataInicio);
        return falta.funcionarioId === funcionarioId && d.getDate() === day && d.getMonth() + 1 === monthMap[month] && falta.aprovacoes?.aprovadoRH;
      });

      return {
        isApproved: !!foundApproved,
        isPending: !!foundPending,
        isParcialApproved: !!foundParcialApproved,
        matchedItem: foundPending || foundApproved || foundParcialApproved || null,
      };
    });
  }, [filteredApproved, filteredForApproval, funcionarioId, month]);

  const handleMouseEnter = useCallback(
    (e) => {
      const cell = e.target;
      const row = cell.parentElement;
      const table = row.parentElement.parentElement;
      const columnIndex = Array.from(row.children).indexOf(cell);

      const isMatch = cell.getAttribute("data-original-color") === "green" || cell.getAttribute("data-original-color") === "yellow";

      if (isMatch) {
        cell.style.backgroundColor = "red";
      }

      Array.from(row.children).forEach((td, index) => {
        if (index !== columnIndex && !td.hasAttribute("data-original-color")) {
          td.style.backgroundColor = "#f5f5f5";
        }
      });

      const headerRow = table.querySelector("thead tr:nth-child(2)");
      if (headerRow && headerRow.children[columnIndex]) {
        headerRow.children[columnIndex].classList.add("bold-day");
      }

      setHoveredMonth(month);

      const monthHeader = table.querySelector(`.header-names-months.${month}`);
      if (monthHeader) {
        monthHeader.classList.add("hovered");
      }
    },
    [setHoveredMonth, month]
  );

  const handleMouseLeave = useCallback(
    (e) => {
      const cell = e.target;
      const row = cell.parentElement;
      const table = row.parentElement.parentElement;
      const columnIndex = Array.from(row.children).indexOf(cell);

      cell.style.backgroundColor = cell.getAttribute("data-original-color");

      Array.from(row.children).forEach((td, index) => {
        if (index !== columnIndex) {
          td.style.backgroundColor = td.getAttribute("data-original-color");
        }
      });

      Array.from(table.rows).forEach((tr) => {
        if (tr.children[columnIndex] && tr !== row) {
          tr.children[columnIndex].style.backgroundColor = tr.children[columnIndex].getAttribute("data-original-color");
        }
      });

      const headerRow = table.querySelector("thead tr:nth-child(2)");
      if (headerRow && headerRow.children[columnIndex]) {
        headerRow.children[columnIndex].classList.remove("bold-day");
      }

      setHoveredMonth(null);

      const monthHeader = table.querySelector(`.header-names-months.${month}`);
      if (monthHeader) {
        monthHeader.classList.remove("hovered");
      }
    },
    [setHoveredMonth, month]
  );

  const handleApproveDay = (day) => {
    const approved = {
      ...day,
      approved: true,
    };
    setDayClicked(approved);
    setOpenPopoverIndex(null);
    //Logic for approving day cell blocked
    setApprovedDays((prevApprovedDays) => [...prevApprovedDays, { day }]);
  };

  const handleNotApproveDay = (day) => {
    //Mutation for not approving day cell
    const notApproved = {
      ...day,
      approved: false,
    };
    setDayClicked(notApproved);
    setOpenPopoverIndex(null);
  };

  return (
    <>
      {days.map((day, index) => {
        const { isApproved, isPending, isParcialApproved, matchedItem } = memoizedMatches[index];

        const isDayToApprove = approvedDays.some(
          (approvedDay) => approvedDay.day === day && approvedDay.month === month && approvedDay.funcionarioId === funcionarioId
        );

        const originalColor = isDayToApprove ? "#68d391" : isParcialApproved ? "#68d391" : isApproved ? "#2f855a" : isPending ? "#c6f6d5" : "";
        return (
          <td
            key={`${month}-${day}`}
            style={{
              minWidth: "30px",
              fontSize: "12px",
              textAlign: "center",
              padding: "2px 5px",
              border: "1px solid #e9e9e9",
              boxSizing: "border-box",
              color: isApproved || isPending ? "white" : "",
              cursor: "pointer",
              backgroundColor: originalColor,
            }}
            data-original-color={originalColor}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isApproved || isPending ? (
              <>
                {isApproved && day}
                {isPending && (
                  <Popover isOpen={openPopoverIndex === index} onClose={() => setOpenPopoverIndex(null)} placement="right" closeOnBlur={false}>
                    <PopoverTrigger onClick={() => setOpenPopoverIndex(index)}>
                      <div onClick={() => setOpenPopoverIndex(index)}>{day}</div>
                    </PopoverTrigger>
                    <PopoverContent color="black">
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>
                        <Heading fontSize="lg">Confirmação</Heading>
                      </PopoverHeader>
                      <PopoverBody>
                        <Text fontSize="sm">Tem a certeza que isto e aquilo</Text>
                      </PopoverBody>
                      <PopoverFooter>
                        <ButtonGroup size="sm">
                          <Button
                            mt="2"
                            size="xs"
                            colorScheme="green"
                            isDisabled={isDayToApprove}
                            onClick={() => {
                              handleApproveDay(matchedItem);
                            }}
                          >
                            Aprovar
                          </Button>
                          <Button
                            mt="2"
                            size="xs"
                            colorScheme="red"
                            onClick={() => {
                              handleNotApproveDay(matchedItem);
                            }}
                          >
                            Rejeitar
                          </Button>
                        </ButtonGroup>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                )}
              </>
            ) : null}
          </td>
        );
      })}
    </>
  );
});

CalendarCells.displayName = "CalendarCells";

const CalendarioTable = React.memo(
  ({ funcionarios, selectedMonth, selectedYear, daysApproved, daysForApproval, setDayClicked, setApprovedAllDays }) => {
    const [hoveredMonth, setHoveredMonth] = useState(null);
    const [loading, setLoading] = useState(false);

    const theadRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const [checkedItems, setCheckedItems] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);

    const handleCheckboxChange = useCallback((funcionarioId) => {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.includes(funcionarioId) ? prevCheckedItems.filter((id) => id !== funcionarioId) : [...prevCheckedItems, funcionarioId]
      );
    }, []);

    useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // Simulate loading time
      return () => clearTimeout(timer);
    }, [selectedYear]);

    const filteredFuncionarios = useMemo(() => {
      const sortedFuncionarios = [...funcionarios].sort((a, b) => a.nome.localeCompare(b.nome));
      return filterApplied && checkedItems.length > 0
        ? sortedFuncionarios.filter((funcionario) => checkedItems.includes(funcionario.id))
        : sortedFuncionarios;
    }, [filterApplied, checkedItems, funcionarios]);

    const handleMouseDown = useCallback((e) => {
      setIsDragging(true);
      setStartX(e.pageX - theadRef.current.offsetLeft);
      setScrollLeft(theadRef.current.scrollLeft);
    }, []);

    const handleMouseMove = useCallback(
      (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - theadRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        theadRef.current.scrollLeft = scrollLeft - walk;
      },
      [isDragging, startX, scrollLeft]
    );

    const handleMouseUp = useCallback(() => {
      setIsDragging(false);
    }, []);

    const handleApproveAllDays = (funcionarioId) => {
      const allDaysToApprove = filteredForApproval
        .filter((day) => day.funcionarioId === funcionarioId)
        .map((day) => ({
          ...day,
          approved: true,
        }));

      setApprovedAllDays((prevList) => [...prevList, ...allDaysToApprove]);
    };

    const handleNotApproveAllDays = (funcionarioId) => {
      const allDaysToNotApprove = filteredForApproval
        .filter((day) => day.funcionarioId === funcionarioId)
        .map((day) => ({
          ...day,
          approved: false,
        }));

      setApprovedAllDays((prevList) => [...prevList, ...allDaysToNotApprove]);
    };

    const filteredMonths = useMemo(() => (selectedMonth === "Todos" ? months : [selectedMonth]), [selectedMonth]);

    const filteredApproved = useMemo(
      () => daysApproved.filter((day) => new Date(day.dataInicio).getFullYear() === parseInt(selectedYear, 10)),
      [daysApproved, selectedYear]
    );

    const filteredForApproval = useMemo(
      () => daysForApproval.filter((day) => day.aprovacoes && Object.keys(day.aprovacoes).length > 0),
      [daysApproved]
    );

    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Box>
      );
    }

    return (
      <div
        ref={theadRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ overflow: "scroll", height: "900px" }}
      >
        <table>
          <thead className="thead-sticky-header" style={{ cursor: isDragging ? "grabbing" : "grab" }}>
            <tr>
              {filteredMonths.map((month) => (
                <th
                  key={month}
                  colSpan={days.length}
                  className={`header-names-months ${month} ${hoveredMonth === month ? "hovered" : ""}`}
                  style={{ userSelect: "none" }}
                >
                  {month}
                </th>
              ))}
            </tr>
            <tr>
              <Flex gap="2" className="sticky-filter" p="2">
                <Button colorScheme="green" isDisabled={!checkedItems.length > 0} size="xs" onClick={() => setFilterApplied(true)}>
                  Filtrar
                </Button>
                <Button
                  colorScheme="red"
                  isDisabled={!checkedItems.length > 0}
                  size="xs"
                  onClick={() => {
                    setCheckedItems([]);
                    setFilterApplied(false);
                  }}
                >
                  Limpar
                </Button>
              </Flex>

              {filteredMonths.map((month) => (
                <React.Fragment key={month}>
                  {days.map((day) => (
                    <th key={`${month}-${day}`} className="header-names-days" style={{ userSelect: "none" }}>
                      {day}
                    </th>
                  ))}
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredFuncionarios &&
              filteredFuncionarios
                .filter((f) => !f.inativo)
                .map((funcionario) => (
                  <tr key={funcionario.id} style={{ lineHeight: "2", padding: "2px 0", userSelect: "none" }}>
                    <td className="funcionario-names" style={{ display: "flex", alignItems: "center", userSelect: "none" }}>
                      <input
                        type="checkbox"
                        style={{ cursor: "pointer", marginLeft: "8px", marginRight: "12px" }}
                        checked={checkedItems.includes(funcionario.id)}
                        onChange={() => handleCheckboxChange(funcionario.id)}
                      />
                      <p style={{ fontSize: "12px" }}>{normalizeName(funcionario.nomeAbreviado)}</p>
                      <Tag ml="2" size="sm" colorScheme="green">
                        10
                      </Tag>
                      <Tag ml="2" size="sm" colorScheme="blue">
                        10
                      </Tag>
                      <Box mr="3" ml="auto" display="flex" gap="2">
                        <IconButton
                          colorScheme="gray"
                          size="xs"
                          icon={<CheckCircleIcon color="green" />}
                          onClick={() => handleApproveAllDays(funcionario.id)}
                        />
                        <IconButton
                          colorScheme="gray"
                          size="xs"
                          icon={<NotAllowedIcon color="red" />}
                          onClick={() => handleNotApproveAllDays(funcionario.id)}
                        />
                      </Box>
                    </td>
                    {filteredMonths.map((month) => (
                      <CalendarCells
                        key={month}
                        month={month}
                        setHoveredMonth={setHoveredMonth}
                        filteredApproved={filteredApproved}
                        filteredForApproval={filteredForApproval}
                        funcionarioId={funcionario.id}
                        setDayClicked={setDayClicked}
                      />
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    );
  }
);

CalendarioTable.displayName = "CalendarioTable";
export default CalendarioTable;
