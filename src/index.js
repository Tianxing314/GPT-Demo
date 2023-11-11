import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { getMatchedProfessionsFromOpenAI } from './openai_api.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(join(__dirname, '..', 'puiblic')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

app.get('/test', (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host')
    console.log("Endpoint is working: ", fullUrl);
    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Test Endpoint</title>
            </head>
            <body>
                <h1>Endpoint is working!</h1>
                <p>${ fullUrl }</p>
            </body>
        </html>
    `;
  res.send(htmlResponse);
});

app.post('/api', async (req, res) => {
    const { message } = req.body;
    try {
        const result = await getMatchedProfessionsFromOpenAI(message);
        res.json(result);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
