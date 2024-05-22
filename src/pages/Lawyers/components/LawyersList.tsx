import { Table, Typography } from '@mui/joy';
import { User } from '../../../types/globalTypes';
import { TableRow } from './TableRow';

type LawyerListProps = {
  lawyers: User[] | undefined;
};

export const LawyersList = ({ lawyers }: LawyerListProps) => {
  return lawyers?.length ? (
    <Table>
      <thead>
        <tr>
          <th style={{ width: '20%' }}>Ім'я</th>
          <th style={{ width: '20%' }}>Прізвище</th>
          <th>Email</th>
          <th aria-label="empty" />
        </tr>
      </thead>
      <tbody>
        {lawyers.map((lawyer) => (
          <TableRow key={lawyer.id} lawyer={lawyer} />
        ))}
      </tbody>
    </Table>
  ) : (
    <Typography level="h4" color="neutral" marginTop="15rem">
      Вибачте, але ми нічого не знайшли
    </Typography>
  );
};
