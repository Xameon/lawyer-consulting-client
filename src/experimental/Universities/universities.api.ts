import { universitiesApi } from '../api';

type GetUniversitiesParamsType = {
  categoryCode: string;
  regionCode: string;
};

export const getUniversities = async ({
  categoryCode,
  regionCode,
}: GetUniversitiesParamsType) => {
  const response = await universitiesApi.get(
    `universities/?ut=${categoryCode}&lc=${regionCode}&exp=json`
  );

  return response.data;
};
