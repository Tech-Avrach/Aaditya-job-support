import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const IconContainer = (props) => {

  const { id="edit-icon", handleOnClick, Icon, text, iconColor = "#545cd8" } = props;
  
  const [tooltipOpen, setTooltipOpen] = useState(false);
  
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <div id="icon-container" style={{paddingLeft: "5px", paddingRight: "5px"}}>
        <Icon
          id={id}
          fontSize="20px"
          color={iconColor}
          style={{ cursor: "pointer" }}
          onClick={handleOnClick}
        />
      </div>
      <Tooltip isOpen={tooltipOpen} target={id} toggle={toggle}>
        {text}
      </Tooltip>
    </>
  );
}

export default IconContainer;
