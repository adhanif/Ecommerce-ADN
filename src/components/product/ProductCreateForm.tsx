import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import {
  useCreateProductMutation,
  useFetchAllCategoriesQuery,
  useUploadImagesMutation,
} from '../../redux/productsQuery';
import { SearchButton } from '../customStyling/buttons';
import axios from 'axios';

type Inputs = {
  images: any;
  title: string;
  price: number;
  description: string;
  categoryId?: number | string;
  files: FileList[];
};

export default function ProductForm() {
  const { data: categories } = useFetchAllCategoriesQuery();
  const [uploadImages, { data, error }] = useUploadImagesMutation();
  const [createProduct] = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: '',
      price: 1,
      description: '',
      categoryId: '',
      files: [],
    },
  });

  const onSubmit = async (data: Inputs) => {
    const file = data.files[0];
    const images: string[] = [];
    try {
      for (let i = 0; i < data.files.length; i++) {
        const filenew = data.files[i];
        if (filenew instanceof File) {
          const formData = new FormData();
          formData.append('file', filenew);
          const result = await uploadImages(formData);
          if ('data' in result && 'location' in result.data) {
            // const location1: string = result.location;
            const location = result.data.location;
            console.log(location);
            images.push(location);
            console.log('successfull');
          } else {
            throw result;
          }
          console.log(result);
        }
      }

      // if (file instanceof File) {
      //   const formData = new FormData();
      //   formData.append('file', file);

      // Make a POST request using axios
      // const result = await axios.post(
      //   'https://api.escuelajs.co/api/v1/files/upload',
      //   formData,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   },
      // );
      // const result = await uploadImages(formData);
      // console.log(result, 'File uploaded successfully');
      // }
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('price', String(data.price));
    formData.append('description', data.description);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    console.log(images);
    try {
      const res = await createProduct({
        title: data.title,
        price: data.price,
        description: data.description,
        images: images,
        categoryId: Number(data.categoryId),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    //
    reset({
      title: '',
      price: 1,
      description: '',
      categoryId: '',
      files: [],
    });
  };

  return (
    <>
      <Container maxWidth='md' sx={{ marginBottom: '12rem' }}>
        <Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container display='flex' justifyContent='center' spacing='10'>
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
                        {categories &&
                          categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
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
                  rules={{ required: 'Attched the images!' }}
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
      </Container>
    </>
  );
}
