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
  useFetchAllCategoriesQuery,
  useCreateProductMutation,
  useFetchAllProductsQuery,
} from '../../redux/productsQuery';
import { StandardButton } from '../customStyling/buttons';
import { useAppDispatch } from '../../redux/store';
import { setNotification } from '../../redux/slices/notificationSlice';

type Inputs = {
  title: string;
  description: string;
  price: number;
  inventory: number;
  categoryId: string;
  images: FileList | null;
};

interface ProductFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductForm: React.FC<ProductFormProps> = ({ setOpen }) => {
  const { data: categories } = useFetchAllCategoriesQuery();
  const { refetch: refetchAllProducts } = useFetchAllProductsQuery();
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
      description: '',
      price: 0,
      inventory: 0,
      categoryId: '',
      images: null,
    },
  });

  const onSubmit = async (data: Inputs) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('price', data.price.toString());
      formData.append('description', data.description);
      formData.append('categoryId', data.categoryId?.toString() || '');
      formData.append('inventory', data.inventory.toString());

      if (data.images) {
        for (let i = 0; i < data.images.length; i++) {
          formData.append('images', data.images[i]);
        }
      }

      const res = await createProduct(formData);

      if ('data' in res) {
        dispatch(
          setNotification({
            open: true,
            message: 'Product has been created!',
            severity: 'success',
          }),
        );
        setOpen(false);
        refetchAllProducts();
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }

    reset({
      title: '',
      description: '',
      price: 0,
      inventory: 0,
      categoryId: '',
      images: null,
    });
  };

  return (
    <>
      <Container>
        <Grid>
          <form
            onSubmit={handleSubmit(onSubmit)}
            // encType='multipart/form-data'
          >
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

              <Grid item xs={12} sm={12} md={12}>
                <Typography variant='subtitle2' color='text.primary'>
                  Inventory
                </Typography>

                <Controller
                  name='inventory'
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
                  name='images'
                  control={control}
                  rules={{ required: 'Attach the images!' }}
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
                {errors.images && (
                  <Typography
                    variant='caption'
                    sx={{ color: 'red' }}
                    marginTop={1}
                    role='alert'
                  >
                    {errors.images.message}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={3} marginTop='2rem'>
                <StandardButton variant='contained' type='submit' fullWidth>
                  Save
                </StandardButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default ProductForm;
