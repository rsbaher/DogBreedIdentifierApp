// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stat, writeFile } from "fs/promises";
import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { promises as fs } from 'fs';

const formidableConfig = {
  keepExtensions: true,
  maxFileSize: 10_000_000,
  maxFieldsSize: 10_000_000,
  maxFields: 7,
  allowEmptyFiles: false,
  multiples: false,
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("IMG API Endpoint");
  if (req.method === 'POST') {
    console.log("req is post method");
    const fData = await new Promise<{ fields: any, files: any }>((resolve, reject) => {
      console.log("fdata func");
      const form = new IncomingForm({
        multiples: false,
        keepExtensions: true,
        allowEmptyFiles: false,
        maxFileSize: 10_000_000,
        maxFieldsSize: 10_000_000
      })
      form.parse(req, async (err, fields, files) => {
        console.log("form parse func");
        if (err) return reject(err)
        const name = "newDogImg.jpg"
        const image = await fs.readFile(files.filepath)
        fs.writeFile(`./public/${name}`, image);
        resolve({ fields, files })
      })
    });
/*
    const file = fData.files.imageFile
    const tempImagePath = file?.filepath
    console.log("FILE: ", file);
    console.log("FILE PATH: ", tempImagePath);
    if (!file) {
      res.status(400).json({ message: 'Missing File.' })
    } else {

      try {
        console.log("starting writing file")
        const name = "newDogImg.jpg"
        const image = await fs.readFile(tempImagePath)
        fs.writeFile(`./public/${name}`, image);
        //const buffer = Buffer.from(await file.arrayBuffer());
        //await writeFile('/public/dogimg.jpg', buffer);
        console.log("Finished writing")
        res.status(200).json({ message: 'Hello from Next.js!' })
      } catch (e) {
        res.status(400).json({ message: 'Error while trying to upload a file' })
      } finally {
        if (tempImagePath) {
          await fs.rm(tempImagePath)
        }
      }

    } */

  } else {
    res.status(400).json({ message: 'Method used is unsupported. Must be POST.' })
  }

}

/*
export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get("file") as Blob | null;
  if (!file) {
    return Response.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    await writeFile('/public/dogimg.jpg', buffer);
    return Response.json({ fileUrl: '/public/dogimg.jpg' });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export default async function Img(req: Request, res: Response) {
  console.log("img api route")
  if (req.method === 'POST') {
    const formData = await req.formData();
    console.log(formData)
    const file = formData.get("file") as Blob | null;
    console.log(file)
    if (!file) {
      console.error("Missing File");
      return Response.error();
    } else {

      const buffer = Buffer.from(await file.arrayBuffer());

      try {
        await writeFile('public/dogimg.jpg', buffer);
        return Response.json({ message: "File uploaded"})
      } catch (e) {
        console.error("Error while trying to upload a file\n", e);
        return Response.error();
      }
    }
  } else {
    console.error("Method used is invalid.");
    return Response.error();
  }
}*/