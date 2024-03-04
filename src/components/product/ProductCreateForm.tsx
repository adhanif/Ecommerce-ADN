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
} from '@mui/material';

import {
  useCreateProductMutation,
  useFetchAllCategoriesQuery,
  useUploadImagesMutation,
} from '../../redux/productsQuery';
import { SearchButton } from '../customStyling/buttons';
import { useAppDispatch } from '../../redux/store';
import { setNotification } from '../../redux/slices/notificationSlice';

type Inputs = {
  images: any;
  title: string;
  price: number;
  description: string;
  categoryId?: number | string;
  files: FileList[];
};

interface ProductFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductForm: React.FC<ProductFormProps> = ({ setOpen }) => {
  const { data: categories } = useFetchAllCategoriesQuery();
  const [uploadImages] = useUploadImagesMutation();
  const [createProduct] = useCreateProductMutation();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,

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
    // const file = data.files[0];
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
            images.push(location);
          }
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    try {
      const res = await createProduct({
        title: data.title,
        price: data.price,
        description: data.description,
        images: images,
        categoryId: Number(data.categoryId),
      });

      if ('data' in res && 'images' in res.data) {
        dispatch(
          setNotification({
            open: true,
            message: 'Product has been created!',
            severity: 'success',
          }),
        );
        setOpen(false);
      }
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
      <Container>
        <Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container display='flex' justifyContent='center' spacing='10'>
              <Grid item xs={12} sm={12} md={6}>
                <Typography variant='subtitle2' color='text.primary'>
                  Title
                </Typography>
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
                <Typography variant='subtitle2' color='text.primary'>
                  Price (€)
                </Typography>

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
                <Typography variant='subtitle2' color='text.primary'>
                  Category
                </Typography>
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

                <Typography
                  variant='caption'
                  sx={{ color: 'red' }}
                  marginTop={1}
                >
                  {errors.categoryId?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} marginTop='1rem'>
                <Typography variant='subtitle2' color='text.primary'>
                  Description
                </Typography>
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
};

export default ProductForm;
