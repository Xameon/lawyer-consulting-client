import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button } from '@mui/joy';
import { User } from '../../../types/globalTypes';
import { useLinkClickHandler } from 'react-router-dom';

type TableRowProps = { lawyer: User };

export const TableRow = ({
  lawyer: { id, firstName, lastName, email },
}: TableRowProps) => {
  // ..................................................
  // Misc Hooks
  const navigateToProfile = useLinkClickHandler(`/lawyer/${id}`);

  // ..................................................
  // Render

  return (
    <tr key={id}>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>
        <Button
          size="sm"
          onClick={navigateToProfile}
          endDecorator={<OpenInNewIcon />}
        >
          Перейти
        </Button>
      </td>
    </tr>
  );
};
