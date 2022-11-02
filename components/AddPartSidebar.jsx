import { useMemo, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { sideBarPartNumAtom, sideBarOpenAtom } from '../logic/atoms';
import { useAtom } from 'jotai';

export default function AddPartSidebar() {
  const [partNum] = useAtom(sideBarPartNumAtom);
  const [open, setOpen] = useAtom(sideBarOpenAtom);

  const toggleSideBar = (e) => {
    setOpen(!open);
  };

  return (
    <div>
      <Offcanvas show={open} placement="end" onHide={toggleSideBar}>
        <Offcanvas.Header>{`part number:${partNum}`}</Offcanvas.Header>
        <Offcanvas.Body>
          <strong>This is the Offcanvas body.</strong>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
