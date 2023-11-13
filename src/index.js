import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { getMatchedProfessionsFromOpenAI } from './openai_api.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { config } from 'dotenv'

config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(join(__dirname, '..', 'puiblic')));
app.use(express.static('public', { 'extensions': ['html', 'htm', 'css'] }));

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

app.post('/authentication', async (req, res) => {
    const { password } = req.body;
    const grant_access = password === process.env.ADMIN_PASSWORD
    res.json({
        grant_access: grant_access
    });
});

app.post('/api', async (req, res) => {
    const { message, model } = req.body;
    try {
        const [result, usage] = await getMatchedProfessionsFromOpenAI(message, model);
        const response = {
            result: result,
            usage: usage
        }
        res.json(response);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
