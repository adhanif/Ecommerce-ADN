import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { useAppDispatch } from '../hooks/useDispatchApp';
import { setFilteredData } from '../../redux/slices/productSlice';
import {
  useFetchAllCategoriesQuery,
  useFetchByPriceRangeCategoryQuery,
} from '../../redux/productsQuery';
import { SearchButton, SquareButton } from '../customStyling/buttons';

import { Product } from '../../misc/types';

//price range filter
interface PriceRange {
  min: number;
  max: number;
}

interface setIsPriceFilterActiveProps {
  setIsPriceFilterActive: (value: boolean) => void;
}

export default function FilterProducts({
  setIsPriceFilterActive,
}: setIsPriceFilterActiveProps) {
  const { data: dataCategories } = useFetchAllCategoriesQuery();
  const dispatch = useAppDispatch();
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: 0,
    max: 0,
  });
  const [categoryId, setCategoryId] = useState('');
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategoryId(event.target.value);
  };

  const [skip, setSkip] = useState(true);
  const { data } = useFetchByPriceRangeCategoryQuery(
    [priceRange.min, priceRange.max, Number(categoryId)],
    { skip: skip },
  );

  const handleFilter = () => {
    dispatch(setFilteredData(data));
    setSkip(false);
    setIsPriceFilterActive(true);
  };

  const handleReset = () => {
    setPriceRange({ min: 0, max: 0 });
    setCategoryId('');

    dispatch(setFilteredData([]));
    setIsPriceFilterActive(false);
  };

  return (
    <>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant='body1' marginBottom='12px'>
          Price Range
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              type='number'
              label='€ Min'
              variant='outlined'
              size='small'
              fullWidth
              name='min'
              value={priceRange.min}
              onChange={handlePriceChange}
              InputLabelProps={{
                style: { fontSize: 'small' },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              type='number'
              label='€ Max'
              variant='outlined'
              size='small'
              fullWidth
              name='max'
              value={priceRange.max}
              onChange={handlePriceChange}
              InputLabelProps={{
                style: { fontSize: 'small' },
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} marginTop='20px'>
          <Grid item>
            <Typography variant='body1' marginBottom='5px'>
              Categories
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth size='small'>
              <Select
                value={categoryId}
                onChange={handleChangeCategory}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {dataCategories &&
                  dataCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={12} marginTop='20px'>
            <SearchButton variant='contained' onClick={handleFilter} fullWidth>
              Filter
            </SearchButton>
            <SquareButton
              variant='outlined'
              onClick={handleReset}
              fullWidth
              sx={{ marginTop: '10px' }}
            >
              Reset
            </SquareButton>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
