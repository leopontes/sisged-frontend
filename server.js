const express = require('express');
const path = require('path');

const appName = "SisGed-Frontend";
const app = express();
const port = process.env.PORT || 8585;

app.use(express.static(`${__dirname}/dist/${appName}`));

app.get('/*', (req, res) =>{
    res.sendFile(path.join(`${__dirname}/dist/${appName}/index.html`));
});

app.listen(port, (err)=>{
    if(err){
        console.error(`Failed to listen on port ${port}.`);
        return process.exit(1);
    }
    console.log(`Listening on port ${port}`);
});
