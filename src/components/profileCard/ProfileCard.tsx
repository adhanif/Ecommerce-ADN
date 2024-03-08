import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { UserProfileData } from '../../misc/types';

export default function ProfileCard({ data }: { data: UserProfileData }) {
  return (
    <>
      <Grid
        container
        display='flex'
        justifyContent='center'
        marginBottom='5rem'
        marginTop='3rem'
      >
        <Grid item xs={12} sm={8} md={8}>
          <Card>
            <CardContent>
              <Grid display='flex' alignItems='center'>
                <Stack marginRight={2}>
                  <Avatar
                    alt={data.name}
                    src={data.avatar}
                    sx={{ width: 100, height: 100, marginBottom: 2 }}
                  />
                </Stack>

                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant='h5' gutterBottom fontWeight='1000'>
                        {data.name.toLocaleUpperCase()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {' '}
                      <Typography variant='body1'>
                        Email: {data.email}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      {/* <Typography variant='body1'>Role: {data.role}</Typography> */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='body1'>
                        Created At: {new Date(data.creationAt).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='body1'>
                        Updated At: {new Date(data.updatedAt).toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
