require('dotenv').config();
const express = require('express')
const app = express()
const db = require('./database')
const router = require('./routes')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5500
db()
const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000']
}
app.use(cookieParser())
app.use(cors(corsOption))
app.use('/storage', express.static('storage'))
app.use(express.json({limit: '8mb'}))
app.use(router);

app.get('/', (req, res)=>{
    res.send("hello from express")
})
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))