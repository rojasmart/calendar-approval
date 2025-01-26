import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";

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
  Box,
} from "@chakra-ui/react";

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

const CalendarioCells = React.memo(
  ({ month, setHoveredMonth, funcionarioId, feriasFaltas, feriasPorAprovar, setDayClicked, setMonthClicked, setFuncionarioIdClicked }) => {
    const [openPopoverIndex, setOpenPopoverIndex] = useState(null);

    const memoizedMatches = useMemo(() => {
      return days.map((day) => {
        const isApproved =
          feriasFaltas &&
          feriasFaltas.some((faltas) => {
            const dataInicio = new Date(faltas.dataInicio);
            const dayInicio = dataInicio.getDate();
            const monthInicio = dataInicio.getMonth() + 1;
            return faltas.funcionarioId === funcionarioId && dayInicio === day && monthInicio === monthMap[month];
          });

        const isPending =
          feriasPorAprovar &&
          feriasPorAprovar.some((faltas) => {
            const dataInicio = new Date(faltas.dataInicio);
            const dayInicio = dataInicio.getDate();
            const monthInicio = dataInicio.getMonth() + 1;
            return faltas.funcionarioId === funcionarioId && dayInicio === day && monthInicio === monthMap[month];
          });

        return { isApproved, isPending };
      });
    }, [feriasFaltas, feriasPorAprovar, funcionarioId, month]);

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

    const handleAprovarClick = (day, funcionarioId) => {
      setDayClicked(day);
      setMonthClicked(month);
      setFuncionarioIdClicked(funcionarioId);
    };

    return (
      <>
        {days.map((day, index) => {
          const { isApproved, isPending } = memoizedMatches[index];
          const originalColor = isApproved ? "green" : isPending ? "yellow" : "";

          return (
            <td
              key={`${month}-${day}`}
              style={{
                minWidth: "40px",
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
                              onClick={() => {
                                handleAprovarClick(day, funcionarioId);
                              }}
                            >
                              Aprovar
                            </Button>
                            <Button mt="2" size="xs" colorScheme="red" onClick={() => {}}>
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
  }
);

CalendarioCells.displayName = "CalendarCells";

const CalendarioTable = React.memo(({ funcionarios, selectedMonth, selectedYear, feriasFaltas, feriasPorAprovar }) => {
  const [hoveredMonth, setHoveredMonth] = useState(null);

  const theadRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  //Approved day and month
  const [dayClicked, setDayClicked] = useState(null);
  const [monthClicked, setMonthClicked] = useState(null);
  const [funcionarioIdClicked, setFuncionarioIdClicked] = useState(null);
  const [clickedList, setClickedList] = useState([]);

  useEffect(() => {
    if (dayClicked && monthClicked && funcionarioIdClicked) {
      const funcionario = funcionarios.find((f) => f.id === funcionarioIdClicked);
      setClickedList((prevList) => [...prevList, { day: dayClicked, month: monthClicked, funcionario: funcionario.nomeAbreviado }]);
    }
  }, [dayClicked, monthClicked]);

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

  const handleRemoveItemList = (index) => {
    setClickedList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const filteredMonths = useMemo(() => (selectedMonth === "Todos" ? months : [selectedMonth]), [selectedMonth]);
  const filteredFaltas = useMemo(
    () => feriasFaltas.filter((dado) => new Date(dado.dataInicio).getFullYear() === parseInt(selectedYear, 10)),
    [feriasFaltas, selectedYear]
  );
  const filteredPorAprovar = useMemo(
    () => feriasPorAprovar.filter((dado) => new Date(dado.dataInicio).getFullYear() === parseInt(selectedYear, 10)),
    [feriasPorAprovar, selectedYear]
  );

  return (
    <div
      ref={theadRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ overflow: "scroll", cursor: isDragging ? "grabbing" : "grab", height: "900px" }}
    >
      <table>
        <thead className="thead-sticky-header">
          <tr>
            <th className="sticky-header"></th>
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
            <th className="sticky-header"></th>
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
          {funcionarios
            .filter((f) => !f.inativo)
            .map((funcionario) => (
              <tr key={funcionario.id} style={{ lineHeight: "3", padding: "2px 0", userSelect: "none" }}>
                <td
                  className="funcionario-names"
                  style={{ display: "flex", alignItems: "center", userSelect: "none", justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input type="checkbox" style={{ cursor: "pointer", marginLeft: "8px", marginRight: "12px" }} />
                    <p style={{ fontSize: "12px" }}>{funcionario.nomeAbreviado}</p>
                  </div>
                  <Box display="flex" alignItems="center" marginRight="20px">
                    <Tag ml="2" size="sm" colorScheme="green">
                      10
                    </Tag>
                    <Tag ml="2" size="sm" colorScheme="blue">
                      10
                    </Tag>
                  </Box>
                </td>
                {filteredMonths.map((month) => (
                  <CalendarioCells
                    key={month}
                    month={month}
                    setHoveredMonth={setHoveredMonth}
                    feriasFaltas={filteredFaltas}
                    feriasPorAprovar={filteredPorAprovar}
                    funcionarioId={funcionario.id}
                    setDayClicked={setDayClicked}
                    setMonthClicked={setMonthClicked}
                    setFuncionarioIdClicked={setFuncionarioIdClicked}
                  />
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {clickedList.length > 0 && (
        <table>
          <tbody>
            {clickedList.map((item, index) => (
              <tr key={`${item.day}-${item.month}-${item.funcionario}`}>
                <td>{item.day}</td>
                <td>{item.month}</td>
                <td>{item.funcionario}</td>
                <td>
                  <button onClick={() => handleRemoveItemList(index)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
});

CalendarioTable.displayName = "CalendarTable";
export default CalendarioTable;
