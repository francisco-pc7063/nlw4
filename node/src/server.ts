import express, {Request, Response} from 'express'

var app = express()

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World - NLW#4")
})

app.listen(3001, () => {
    console.log("[DEBUG]: Server inciado...\n\n")
})