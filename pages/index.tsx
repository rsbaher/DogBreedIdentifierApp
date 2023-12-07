import Head from 'next/head'
import ImageCanvas from "../components/ImageCanvas";
import FileUpload from "../components/FileUpload";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function Home() {  
  
  return (
    <Container maxWidth='lg'>
      <Head>
        <title>Dog Breed Classifier</title>
        <meta name="description" content="Predicts dog breed from an image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <Container sx={{ width: '100%', marginTop: '2em'}}>
            <Typography variant='h1'>Dog Breed Classifier</Typography>
            <Typography variant='body1' sx={{paddingTop: '1em'}}>Start by uploading an Image of a dog.</Typography>
            <Typography variant='body2' color='secondary' sx={{}}>Please note, results would be more accurate if the image contains a maximum of one dog.</Typography>
            <FileUpload></FileUpload>
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