import type { NextPage } from 'next';
import Head from 'next/head';
import ImageCanvas from "../components/ImageCanvas";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';


const SqueezeNet: NextPage = () => {  
  
  return (
    <Container maxWidth='lg'>
      <Head>
        <title>SqueezeNet Example</title>
        <meta name="description" content="SqueezeNet Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <Container sx={{ width: '100%', marginTop: '2em'}}>
            <Typography variant='h1'>SqueezeNet Example</Typography>
        <Container maxWidth='md'>
          <Box sx={{ width: '90%', paddingTop: '5%', paddingBottom: '5%'}}>
            <ImageCanvas width={240} height={240}/>
            <div id="result"></div>
          </Box>
        </Container>
      </Container>
      </main>
    </Container>
  )
}

export default SqueezeNet
