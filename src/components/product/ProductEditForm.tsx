import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useUpdateProductMutation } from '../../redux/productsQuery';
import { SearchButton } from '../customStyling/buttons';
import { Product, SelectOptions } from '../../misc/types';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Inputs = {
  title: string;
  price: number;
  description: string;
  categoryId?: number | string;
  files: FileList[];
};

const selectOptions: SelectOptions[] = [
  { id: 1, label: 'Clothes' },
  { id: 2, label: 'Electronics' },
  { id: 3, label: 'Furniture' },
  { id: 4, label: 'Shoes' },
];

type ProductEditFormProps = {
  handleCloseModal: () => void;
  item: Product;
};

export default function ProductEditForm(props: ProductEditFormProps) {
  const { handleCloseModal, item } = props;
  // console.log('it is rendering');
  // const [uploadImages, { data, error }] = useUploadImagesMutation();
  const [updateProduct] = useUpdateProductMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: item.title,
      price: item.price,
      description: item.description,
      categoryId: '',
      files: [],
    },
  });

  const onSubmit = async (data: Inputs) => {
    const updatedObject = {
      title: data.title,
      price: data.price,
      description: data.description,
      // categoryId: data.categoryId,
    };
    try {
      await updateProduct([item.id, updatedObject]);
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Box>
          <IconButton
            aria-label='close'
            onClick={handleCloseModal}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={style}>
          <Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                display='flex'
                justifyContent='center'
                spacing='10'
              >
                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant='subtitle2'>Title</Typography>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: '*Title*' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size='small'
                        variant='outlined'
                        color='primary'
                        fullWidth
                      />
                    )}
                  />
                  {errors.title && (
                    <Typography
                      variant='caption'
                      sx={{ color: 'red' }}
                      marginTop={1}
                      role='alert'
                    >
                      {errors.title.message}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant='subtitle2'>Price (€)</Typography>

                  <Controller
                    name='price'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type='number'
                        size='small'
                        variant='outlined'
                        color='primary'
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} marginTop='1rem'>
                  <Typography variant='subtitle2'>Category</Typography>
                  <Controller
                    name='categoryId'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth size='small'>
                        <Select {...field}>
                          {selectOptions.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />

                  {/* <FormControl fullWidth size='small'>
                  <Select
                    {...register('categoryId')}
                    defaultValue={''}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {categories &&
                      categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl> */}

                  <Typography
                    variant='caption'
                    sx={{ color: 'red' }}
                    marginTop={1}
                  >
                    {errors.categoryId?.message}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={12} marginTop='1rem'>
                  <Typography variant='subtitle2'>Description</Typography>
                  <Controller
                    name='description'
                    control={control}
                    rules={{ required: '*Description*' }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant='outlined'
                        {...field}
                      />
                    )}
                  />
                  {errors.description && (
                    <Typography
                      variant='caption'
                      sx={{ color: 'red' }}
                      marginTop={1}
                      role='alert'
                    >
                      {errors.description.message}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={12} md={12} marginTop='2rem'>
                  <Controller
                    name='files'
                    control={control}
                    // rules={{ required: 'Attched the images!' }}
                    render={({ field }) => (
                      <input
                        type='file'
                        multiple
                        onChange={(e) => {
                          const fileList = e.target.files;
                          field.onChange(fileList);
                        }}
                      />
                    )}
                  />
                  {errors.files && (
                    <Typography
                      variant='caption'
                      sx={{ color: 'red' }}
                      marginTop={1}
                      role='alert'
                    >
                      {errors.files.message}
                    </Typography>
                  )}
                  {/* <input
                  type='file'
                  multiple
                  {...register('files', { required: 'Files are required' })}
                /> */}
                </Grid>
                <Grid item xs={12} sm={12} md={3} marginTop='2rem'>
                  <SearchButton variant='contained' type='submit' fullWidth>
                    Save
                  </SearchButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
