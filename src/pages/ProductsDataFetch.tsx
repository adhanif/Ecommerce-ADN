import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  useFetchAllProductsQuery,
  useFetchBySearchQuery,
} from '../redux/productsQuery';
import ProductCard from '../components/product/ProductCard';
import Loading from '../components/loading/Loading';
import { Product } from '../misc/types';
import FilterProducts from '../components/product/FilterProducts';
import { AppState } from '../redux/store';
import { SearchButton } from '../components/customStyling/buttons';
import { sortData } from '../components/utils/products';

export default function ProductsDataFetch() {
  const [mainData, setMainData] = useState<Product[]>([]);

  const searchQuery = useRef<TextFieldProps>(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [isPriceFilterActive, setIsPriceFilterActive] = useState(false);

  const { data: allData, isLoading } = useFetchAllProductsQuery();

  const { data: searchData } = useFetchBySearchQuery(
    searchQuery.current && typeof searchQuery.current.value === 'string'
      ? searchQuery.current.value
      : '',
  );
  if (formSubmitted) {
  }

  const priceFilterData: Product[] = useSelector(
    (state: AppState) => state.products.products,
  );

  useEffect(() => {
    if (isPriceFilterActive) {
      setMainData(priceFilterData);
      setIsPriceFilterActive(true);
    } else if (
      !isPriceFilterActive &&
      searchData
      // && searchData.length > 0
    ) {
      setMainData(searchData);

      setFormSubmitted(false);
      setIsPriceFilterActive(false);
    } else if (!isPriceFilterActive && allData?.length) {
      setMainData(allData);
      setIsPriceFilterActive(false);
    }
  }, [
    priceFilterData,
    mainData,
    searchData,
    allData,
    formSubmitted,
    setMainData,
    isPriceFilterActive,
  ]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    setCurrentPage(1);
  };

  const sortedData = sortData(mainData, sortBy);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = sortedData.slice(startIndex, endIndex);

  const handleChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      setSortBy(event.target.value);
    },
    [setSortBy],
  );

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage],
  );

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <Container maxWidth='xl' sx={{ marginTop: '5rem' }}>
        <Box display='flex'>
          <Link to='/home' style={{ textDecoration: 'none' }}>
            <Typography variant='body2' color='grey.600'>
              Home
            </Typography>
          </Link>

          <Typography variant='body2' color='grey.600'>
            / Products
          </Typography>
        </Box>
        <Box>
          <Typography
            fontWeight='900'
            component='h2'
            variant='h2'
            textAlign='center'
            sx={{
              typography: {
                xs: { fontSize: '1.5rem' },
                sm: { fontSize: '2.5rem' },
                md: { fontSize: '3rem' },
              },
            }}
          >
            Products
          </Typography>
        </Box>
        <Box
          id='highlights'
          sx={{
            pb: { xs: 8, sm: 16 },
          }}
        >
          <Grid
            container
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            marginBottom='3rem'
            marginTop='3rem'
          >
            <Grid item xs={12} md={3}>
              <Typography>{`Showing all ${sortedData.length} results`}</Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={9}
              display='flex'
              justifyContent='space-between'
            >
              <Grid
                container
                item
                xs={12}
                md={6}
                sx={{
                  mt: { xs: '10px', sm: '10px', md: '0px' },
                  mb: { xs: '30px', sm: '30px', md: '0px' },
                }}
              >
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                  <Grid container alignItems='flex-end'>
                    <Grid item xs={12} md={8}>
                      <TextField
                        // value={searchQuery}
                        size='small'
                        label='Search by title'
                        variant='outlined'
                        fullWidth
                        // onChange={handleSearchChange}
                        inputRef={searchQuery}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <SearchButton variant='contained' type='submit' fullWidth>
                        Search
                      </SearchButton>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl
                  sx={{ minWidth: 230, border: 'none' }}
                  size='small'
                  fullWidth
                >
                  <Select
                    value={sortBy}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value=''>Default sorting</MenuItem>
                    <MenuItem value='lowToHigh'>
                      Sort by price: low to high
                    </MenuItem>
                    <MenuItem value='highToLow'>
                      Sort by price: high to low
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <FilterProducts setIsPriceFilterActive={setIsPriceFilterActive} />
            </Grid>

            {/* Products Grid Container */}
            <Grid item xs={12} sm={12} md={9} lg={9}>
              {slicedData.length === 0 ? (
                <Typography variant='body1'>No results found.</Typography>
              ) : (
                <Grid container spacing={2.5}>
                  {slicedData &&
                    slicedData.map((product, index) => (
                      <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                        <ProductCard product={product} />
                      </Grid>
                    ))}
                </Grid>
              )}
              <Box marginTop='5rem' display='flex' justifyContent='center'>
                <Pagination
                  count={Math.ceil(sortedData.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant='outlined'
                  shape='rounded'
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
