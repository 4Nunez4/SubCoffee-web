import express from 'express';

const app = express()

app.listen(4000, () => {
    console.log("Connected on port: ", 4000);
})