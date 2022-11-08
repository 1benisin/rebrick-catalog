import { useMemo, useState } from 'react';
import { Button, Offcanvas, Spinner } from 'react-bootstrap';
import { sideBarPartNumAtom, sideBarOpenAtom } from '../logic/atoms';
import { useAtom } from 'jotai';
import useColors from '../fetchers/useColors';

export default function AddPartSidebar() {
  const [partNum] = useAtom(sideBarPartNumAtom);
  const [open, setOpen] = useAtom(sideBarOpenAtom);
  const { colors, isLoading, error } = useColors(partNum);

  const toggleSideBar = (e) => {
    setOpen(!open);
  };

  return (
    <div>
      <Offcanvas show={open} placement="end" onHide={toggleSideBar}>
        <Offcanvas.Header>{`part number:${partNum}`}</Offcanvas.Header>
        <Offcanvas.Body>
          <strong>This is the Offcanvas body.</strong>
          {isLoading ? <Spinner /> : <p>{JSON.stringify(colors)}</p>}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
