import React from "react";
import { InputGroup, Button, Input } from "reactstrap";

const FilterComponent = ( { filterText, onFilter, onClear } ) => (
    
  <>
    <InputGroup size = "sm" className="mb-3" style = { { width: "35%" } }>
      <Input 
      id = "search"
      type = "text"
      placeholder = "Search..."
      value = { filterText }
      onChange = { onFilter }
      />
      <Button color="primary" onClick = { onClear }>      
        <i className="pe-7s-close" style = { { cursor: "pointer", fontWeight: "bold"} }></i>
      </Button>
    </InputGroup>
  </>
);

export default FilterComponent;
