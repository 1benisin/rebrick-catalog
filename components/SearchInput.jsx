import { Input } from 'reactstrap';
import { searchFilterAtom } from '../logic/atoms';
import { useAtom } from 'jotai';

export default function SearchInput() {
  const [_, setSearchFilter] = useAtom(searchFilterAtom);

  const onSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      setSearchFilter(e.target.value);
    }
  };

  // _ _ _ COMPONENT UI _ _ _ _ _ _ _ _ _ _ _ _

  return <Input onKeyDown={onSearchSubmit} />;
}
