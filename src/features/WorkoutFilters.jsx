import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../shared/Button.jsx";

const StyledForm = styled.form`
  padding: 0.5rem;
`;
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const StyledLabel = styled.label`
  font-weight: 600;
`;
const StyledSelect = styled.select`
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #c4c9d4;
  font-size: 0.95rem;
`;

function WorkoutsViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);
    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  const preventRefresh = (e) => {
    e.preventDefault();
  };

  return (
    <StyledForm onSubmit={preventRefresh}>
      <StyledDiv>
        <StyledLabel htmlFor="search">Search Exercises</StyledLabel>
        <input
          id="search"
          type="text"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <Button onClick={() => setLocalQueryString("")}>Clear</Button>

        <StyledLabel htmlFor="sortField">Sort by</StyledLabel>
        <StyledSelect
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="Exercise">Exercise</option>
          <option value="createdTime">Time added</option>
        </StyledSelect>

        <StyledLabel htmlFor="sortDirection">Direction</StyledLabel>
        <StyledSelect
          id="sortDirection"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </StyledSelect>
      </StyledDiv>
    </StyledForm>
  );
}

export default WorkoutsViewForm;
