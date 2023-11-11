import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { getMatchedProfessionsFromOpenAI } from './openai_api.js'


const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

app.get('/get', (req, res) => {
    console.log("test")
    res.json({
        test: "test22"
    });
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
