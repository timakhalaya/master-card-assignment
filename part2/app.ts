import express, { Request, Response } from 'express';
import * as fs from 'fs'
import * as bodyParser from 'body-parser';
import { handleErrorsGeneric } from './services/errors';
import { processValidCharacters } from './services/logic';
import { upload } from './services/middleware';
import audit from 'express-requests-logger'


const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(audit())

app.post('/upload',upload.single('file'),async(req: Request, res: Response) => {
    // @ts-ignore
    const uploadedFile = req.file;
    const fileContents = await fs.promises.readFile(`./${uploadedFile?.filename}`, 'utf8')
    const stringProcessingResult = processValidCharacters(fileContents);

    res.json({ message: stringProcessingResult });
});

app.use(handleErrorsGeneric)

app.listen(port, () => {
  console.log(`You app is running on port ${port}`);
});
