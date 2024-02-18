import express from 'express'
const app = express()
app.use(express.json())

const PORT = 3000

app.get('/test', (_, res) => {
    
    console.log('Hola mundoooo!')
    res.send('Hola mundoooo jeje!')
})

app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`)
})