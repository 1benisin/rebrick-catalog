import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

const ButtonToggle = ({
  toggleOn,
  toggleOff,
  text,
  tooltip,
  disabled = false,
}) => {
  const [active, setActive] = useState(true);

  const onClick = () => {
    active ? toggleOn() : toggleOff();
    setActive(!active);
  };

  return (
    // <OverlayTrigger delay={1000} overlay={<Tooltip>{tooltip}</Tooltip>}>
    <Button
      onClick={onClick}
      variant={active ? 'success' : 'danger'}
      disabled={disabled}
    >
      {text}
    </Button>
    // </OverlayTrigger>
  );
};

export default ButtonToggle;
