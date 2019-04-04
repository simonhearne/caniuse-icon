const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

var data = require('./caniuse.json');


app.get('/', (req, res) => res.send('</h1>CanIUse Icon Generator</h1><br>'+renderLinks()));

app.get('/:tag', function(req, res, next) {
  let tag = req.params.tag;
  let exists = data.data.hasOwnProperty(tag);
  if (exists) {
    let svg = renderSVG(tag);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  } else {
    res.status(404).send(tag + ' not found');
  }
});

function renderLinks() {
    let str = '<ul>';
    for (item in data.data) {
        str = str + `<li><a href="/${item}">${item}</li>`;
    }
    return str + '</ul>';
}

function renderSVG(tag) {
    let value = data.data[tag].usage_perc_y.toFixed(2);
    let name = data.data[tag].title;
    name = name.replace("&","&amp;");
    let width = Math.max(120,name.length * 6.5);
    return `
    <svg class="caniuseicon" width="${width}px" height="60px" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
    <style>text {font-family: sans-serif; font-size: 14px;}</style>
    <text text-anchor="middle" style="font-size: 18px;" x="50" y="18">${name}</text>
    <text text-anchor="middle" style="font-size: 32px;" x="50" y="47">${value}%</text>
    <text text-anchor="middle" x="50" y="62">global browser support</text>
    <text text-anchor="middle" style="font-style: oblique" x="50" y="73"><a target="_blank" rel="noopener" href="https://caniuse.com/#feat=${tag}">caniuse.com</a></text>
    </svg>`
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))