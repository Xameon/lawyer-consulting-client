import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  Option,
  Select,
  Textarea,
  Typography,
} from '@mui/joy';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getUniversities } from '../../../api/universities.api';
import { ukrainianRegions } from '../../../constants';
import { useLawyerCreateOrUpdate } from '../../../hooks/lawyer/useLawyerCreateOrUpdate';

export const DataEditorModal = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [universityRegion, setUniversityRegion] = useState<string>('');
  const [universities, setUniversities] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      education: '',
      experience: '',
      description: '',
      hourly_rate: '',
    },
  });

  const { mutate: lawyerUpdate } = useLawyerCreateOrUpdate();

  useEffect(() => {
    if (!universityRegion) return;

    getUniversities({
      categoryCode: '01',
      regionCode: universityRegion,
    }).then((res) => setUniversities(res));
  }, [universityRegion]);

  const handleChangeUniversityRegion = (_: unknown, newValue: string) => {
    setUniversityRegion(newValue);
  };

  const onSubmit = (data: {
    education: string;
    experience: string;
    description: string;
    hourly_rate: string;
  }) => {
    lawyerUpdate(data);
  };

  return (
    <>
      <Button onClick={() => setOpened(true)}>Вказати дані</Button>
      <Modal
        open={opened}
        onClose={() => setOpened(false)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem',
            width: '45em',
            height: '33rem',
            backgroundColor: 'white',
            boxShadow: '2px 2px 5px 2px rgba(0, 0, 0, 0.1)',
            borderRadius: '9px',
          }}
        >
          <Typography level="h3" textAlign="center">
            Дані Юриста
          </Typography>
          <FormControl>
            <FormLabel>Заклад Освіти</FormLabel>
            <Select
              placeholder="Оберіть область вашого закладу освіти"
              onChange={handleChangeUniversityRegion}
              value={universityRegion}
            >
              {ukrainianRegions.map(({ code, name }) => (
                <Option key={code} value={code}>
                  {name}
                </Option>
              ))}
            </Select>
          </FormControl>

          {universityRegion && (
            <FormControl>
              <Autocomplete
                options={
                  universities?.map(({ university_name }) => university_name) ??
                  []
                }
                placeholder="Оберіть ваш заклад освіти"
                {...register('education', { required: true })}
                error={!!errors.education}
              ></Autocomplete>
            </FormControl>
          )}
          <FormControl>
            <FormLabel>Досвід роботи (у роках)</FormLabel>
            <Input
              type="number"
              {...register('experience', { required: true })}
              error={!!errors.experience}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ціна Консультації (₴)</FormLabel>
            <Input
              type="number"
              {...register('hourly_rate', { required: 'true' })}
              error={!!errors.hourly_rate}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Опис профілю</FormLabel>
            <Textarea minRows={3} maxRows={3} />
          </FormControl>
          <Button type="submit">Відправити Дані</Button>
        </form>
      </Modal>
    </>
  );
};
