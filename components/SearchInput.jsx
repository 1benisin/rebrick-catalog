import { Form } from 'react-bootstrap';
import { searchFilterAtom } from '../logic/atoms';
import { useAtom } from 'jotai';

export default function SearchInput() {
  const [_, setSearchFilter] = useAtom(searchFilterAtom);

  const onSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchFilter(e.target.value);
    }
  };

  return (
    <Form onKeyDown={onSearchSubmit}>
      {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> */}
      {/* <Form.Label>Email address</Form.Label> */}
      <Form.Control placeholder="Search" />
      {/* </Form.Group> */}
    </Form>
  );
}
