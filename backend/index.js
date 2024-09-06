
import express from 'express'
import cors from 'cors'
import appRoutes from './routers/mainRouter.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT=process.env.PORT

connect().catch(err=>console.log(err))

const app = express()

app.use(express.json())


app.use(express.static("public"));

app.use(cors({
    origin: true,
    credentials: true,
    methods: `GET,PUT,POST,DELETE`,
    allowedHeaders: `Content-Type, Accept, Authorization`
}))

app.listen(PORT, () => {
    console.log(chalk.blue(`listeing on port ${PORT}`));
})
app.use(`/`,appRoutes)

app.get(`/`, (req, res) => {
    res.send(`welcome`)
})


app.get(`*`,(req,res)=>{
     res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(`<meta charset="UTF-8">`);
        res.write(`
            <style>
                * {
                    text-align: center;
                    color: red;
                }
            </style>
        `);
        res.write("<h1>ERROR 404</h1>");
        res.write("<h2>The route you are trying to reach does not exist!</h2>");
        res.end();
    });
