import { useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

const FileUpload = () => {

  const uploadFile = async (event: any) => {
    console.log("Uploading File Fuc ... ")
    console.log(event)
    if (event.target.files && event.target.files[0]) {
      console.log("File exists")
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch("/api/img", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          console.error("something went wrong, check your console.");

        }
        console.log("Results: ")
        console.log(res)
        /** Reset file input */
        event.target.type = "text";
        event.target.type = "file";
      } catch (error) {
        console.error(error)
        console.error("something went wrong, error is above.");

      }

    } else {
      console.warn("No file was entered.");
      return;
    }
  };

  return (
    <Container sx={{ paddingTop: '1em' }}>
      <Typography variant='h5'>Testing Upload...</Typography>

      {/*<TextField type="file" />
        <Button variant="contained" color='secondary' onClick={uploadFile}>Upload</Button> */}
      <Input type="file" inputProps={{ accept: "image/*" }} name="myImage" onChange={uploadFile} sx={{ paddingTop: '1em' }} />
    </Container>
  )

};

export default FileUpload;
