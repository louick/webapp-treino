const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/gerar-pdf', async (req, res) => {
  const grupoMuscular1 = req.body.grupoMuscular1;
  const grupoMuscular2 = req.body.grupoMuscular2;
  const exercicio = req.body.exercicio;
  const series = req.body.series;
  const repeticoes = req.body.repeticoes;
  const imagePath = path.join(__dirname, 'public', 'FitPlan.png');
  const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });


  // Renderiza o conteúdo HTML do PDF usando os dados do formulário
  const html = await ejs.renderFile(path.join(__dirname, 'views', 'pdf.ejs'), {
    grupoMuscular1,
    grupoMuscular2,
    exercicio,
    series,
    repeticoes,
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '30px', right: '30px', bottom: '30px', left: '30px' },
  });

  await browser.close();

  res.contentType('application/pdf');
  res.send(pdfBuffer);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
