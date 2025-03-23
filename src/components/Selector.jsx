import { Select, Flex } from "@chakra-ui/react";

function Selector({ department, setDepartment, month, setMonth, year, setYear, order, setOrder, departamentos, months, years }) {
  const handleChangeDepartamento = (e) => {
    setDepartment(e.target.value);
  };

  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  };
  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };

  return (
    <Flex mb="4" justifyContent="space-between" gap="6">
      <Select cursor="pointer" size="sm" placeholder="Departamento" value={department} onChange={handleChangeDepartamento}>
        <option value="Todos">Todos</option>
        {departamentos.map((departamento) => (
          <option key={departamento.id} value={departamento.idAlternativo}>
            {departamento.nome}
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
        {/*  {orders.map((order, index) => (
          <option key={index} value={order}>
            {order}
          </option>
        ))} */}
      </Select>
    </Flex>
  );
}

export default Selector;
