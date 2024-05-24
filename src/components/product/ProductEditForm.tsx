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

import {
  useFetchAllCategoriesQuery,
  useFetchAllProductsQuery,
  useUpdateProductMutation,
} from '../../redux/productsQuery';
import { StandardButton } from '../customStyling/buttons';
import { Product } from '../../misc/types';
import { useAppDispatch } from '../hooks/useDispatchApp';
import { setNotification } from '../../redux/slices/notificationSlice';
import Loading from '../loading/Loading';

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
  description: string;
  price: number;
  inventory: number;
  categoryId: string;
  images: FileList | null;
};

type ProductEditFormProps = {
  handleCloseModal: () => void;
  item: Product;
};

export default function ProductEditForm(props: ProductEditFormProps) {
  const { handleCloseModal, item } = props;
  const [updateProduct, { isLoading: updateIsLoading }] =
    useUpdateProductMutation();
  const { data: categoriesData, isLoading } = useFetchAllCategoriesQuery();
  const { refetch: refetchAllProducts } = useFetchAllProductsQuery();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: item.title,
      price: item.price,
      description: item.description,
      inventory: item.inventory,
      categoryId: '',
      images: null,
    },
  });

  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price.toString());
    formData.append('description', data.description);
    formData.append(
      'categoryId',
      data.categoryId.toString() || item.category.id,
    );
    formData.append('inventory', data.inventory.toString());
    if (data.images) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }
    }

    try {
      const res = await updateProduct([item.id, formData]);
      if ('data' in res) {
        dispatch(
          setNotification({
            open: true,
            message: `Product ${item.title} has been updated!`,
            severity: 'success',
          }),
        );
      }
      refetchAllProducts();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  if (updateIsLoading || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container>
        <Box>
          <IconButton
            aria-label='close'
            onClick={handleCloseModal}
            style={{
              position: 'absolute',
              top: 50,
              right: 50,
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
                          {categoriesData &&
                            categoriesData.map((category) => (
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
                  <Typography
                    variant='caption'
                    sx={{ color: 'red' }}
                    marginTop={1}
                  >
                    {errors.inventory?.message}
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
                    name='images'
                    control={control}
                    // rules={{ required: 'Attach the images!' }}
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
        </Box>
      </Container>
    </>
  );
}
