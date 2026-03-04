import { forwardRef } from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  margin-right: 0.25rem;
`;
const StyledInput = styled.input`
  padding: 0.4rem 0.5rem;
`;

const TextInputWithLabel = forwardRef(function TextInputWithLabel(
  { elementId, labeltext, onChange, value, name, type = "text", min },
  ref,
) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <StyledLabel htmlFor={elementId}>{labeltext}</StyledLabel>
      <StyledInput
        type={type}
        id={elementId}
        name={name}
        ref={ref}
        value={value}
        onChange={onChange}
        min={min}
      />
    </div>
  );
});

export default TextInputWithLabel;
