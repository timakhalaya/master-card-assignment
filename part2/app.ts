import express from 'express';
import { upload,processValidCharacters } from './service';
import * as fs from 'fs'


const app = express();
const port = process.env.PORT;

app.post('/upload',upload.single('file'),async(req, res) => {
    // @ts-ignore
    const uploadedFile = req.file;
    const fileContents = await fs.promises.readFile(`./${uploadedFile?.filename}`, 'utf8')
    const stringProcessingResult = processValidCharacters(fileContents);

    res.json({ message: stringProcessingResult });
  });

app.listen(port, () => {
  console.log(`You app is listening on port ${port}`);
});
