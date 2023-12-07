import { useRef, useState } from 'react';
import { IMAGE_URLS } from '../data/sample-image-urls';
import { inferenceSqueezenet } from '../utils/predict';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface Props {
  height: number;
  width: number;
}

const ImageCanvas = (props: Props) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  var image: HTMLImageElement;
  const [topResultLabel, setLabel] = useState("");
  const [topResultConfidence, setConfidence] = useState("");
  const [inferenceTime, setInferenceTime] = useState("");

  const [topResult1, setTopResult1] = useState("");
  const [topResult2, setTopResult2] = useState("");
  const [topResult3, setTopResult3] = useState("");
  const [topResult4, setTopResult4] = useState("");
  const [topResult5, setTopResult5] = useState("");
  const [top5Label, setTop5Label] = useState("");
  
  // Load the image from the IMAGE_URLS array
  const getImage = () => {
    var sampleImageUrls: Array<{ text: string; value: string }> = IMAGE_URLS;
    var random = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    return sampleImageUrls[random];
  }

  // Draw image and other  UI elements then run inference
  const displayImageAndRunInference = () => { 
    // Get the image
    image = new Image();
    var sampleImage = getImage();
    image.src = sampleImage.value;

    // Clear out previous values.
    setLabel(`Inferencing...`);
    setConfidence("");
    setInferenceTime("");
    setTopResult1('');
    setTopResult2('');
    setTopResult3('');
    setTopResult4('');
    setTopResult5('');
    setTop5Label('');

    // Draw the image on the canvas
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d');
    image.onload = () => {
      ctx!.drawImage(image, 0, 0, props.width, props.height);
    }
   
    // Run the inference
    submitInference();
  };

  const submitInference = async () => {
    // Get the image data from the canvas and submit inference.
    var [inferenceResult,inferenceTime] = await inferenceSqueezenet(image.src);

    // Get the highest confidence.
    var topResult = inferenceResult[0];
    var conf = Math.round(topResult.probability*100)

    // Update the label and confidence
    setLabel(topResult.name.toUpperCase());
    setConfidence(`${conf}% Confidence`);
    setInferenceTime(`Inference speed: ${inferenceTime} seconds`);
    setTopResult1(`${topResult.name}: ${conf}%`);
    setTopResult2(`${inferenceResult[1].name}: ${Math.round(inferenceResult[1].probability*100)}%`);
    setTopResult3(`${inferenceResult[2].name}: ${Math.round(inferenceResult[2].probability*100)}%`);
    setTopResult4(`${inferenceResult[3].name}: ${Math.round(inferenceResult[3].probability*100)}%`);
    setTopResult5(`${inferenceResult[4].name}: ${Math.round(inferenceResult[4].probability*100)}%`);
    setTop5Label('Top 5 Results:');
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Stack spacing={2}>
        <Button variant="contained" size="large"
          onClick={displayImageAndRunInference} >
          Run Squeezenet inference
        </Button>
        <Grid container spacing={2}>
          <Grid item xs={8}>
          <Stack spacing={2}>
            <canvas ref={canvasRef} width={props.width} height={props.height} />
            <Typography variant='h5' alignSelf={'center'}>{top5Label}</Typography>
            <Item>{topResult1}</Item>
            <Item>{topResult2}</Item>
            <Item>{topResult3}</Item>
            <Item>{topResult4}</Item>
            <Item>{topResult5}</Item>

            </Stack>
          </Grid>
          <Grid item xs={4}>
          <Stack spacing={2}>
          <Typography variant='subtitle1' alignSelf={'center'}>{topResultLabel}</Typography>
            <Item>{topResultConfidence}</Item>
            <Item>{inferenceTime}</Item>
          </Stack>
          </Grid>
        </Grid>
      </Stack>
    </>
  )

};

export default ImageCanvas;
