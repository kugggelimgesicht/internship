const express = require('express')
const path = require('path')
const app = express()
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})
const PORT = process.env.PORT || 3000
app.listen(3000, () => {
console.log(`server is running on port ${PORT}`)
})