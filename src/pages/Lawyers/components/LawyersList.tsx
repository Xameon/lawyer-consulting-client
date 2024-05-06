import { Skeleton, Table, Typography } from '@mui/joy';
import { Lawyer } from '../../../types/globalTypes';

type LawyerListProps = {
  lawyers: Lawyer[] | undefined;
};

export const LawyersList = ({ lawyers }: LawyerListProps) => {
  return lawyers?.length ? (
    <Table>
      <thead>
        <tr>
          <th style={{ width: '20%' }}>Ім'я</th>
          <th style={{ width: '20%' }}>Прізвище</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {lawyers.map(({ email, firstName, lastName }) => (
          <tr>
            <td>
              <Skeleton variant="rectangular">{firstName}</Skeleton>
            </td>
            <td>
              <Skeleton variant="rectangular">{lastName}</Skeleton>
            </td>
            <td>{email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <Typography level="h4" color="neutral" marginTop="15rem">
      Вибачте, але ми нічого не знайшли
    </Typography>
  );
};
