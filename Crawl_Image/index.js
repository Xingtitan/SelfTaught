// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://kenh14.vn/ai-roi-cung-khac-cac-hot-girl-nay-cung-khong-ngoai-le-khi-vong-1-cu-ngay-cang-phong-phao-20171207193958533.chn');
//   await page.screenshot({path: 'output.png'});
  
//   const imageSrcs = await page.$$eval('.sp-img-zoom > img, .sp-img-lightbox > img, .detail-img-lightbox > img', imgs => {
//     return imgs.map(img => img.src)
//   });

//   console.log(imageSrcs);
//   await browser.close();
// })();


const puppeteer = require('puppeteer');
const image_Download = require('image-downloader');
const fs = require('fs');
require('dotenv').config();


function createResultFolder(resultFolder) {
  if (!fs.existsSync(resultFolder)) {
    fs.mkdirSync(resultFolder);
  }
}


async function getImageURLs(urlLogin, urlDownloadPage) {
  // Login to account through Facebook
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 600 });
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
  // await page.goto(urlLogin);
  // await page.click('.KPnG0');
  // await page.type('#email', process.env.MAIL);
  // await page.type('#pass', process.env.PASSWORD);
  // await page.click('._xkt > button');
  // await page.waitForTimeout(3000);

  // Access to page need to scrape image   
  await page.goto(urlDownloadPage);

  // Get the image src
  // const selector = 'article img';
  // const imageSrcs = await page.$$eval(selector, imgs => {
  //   return imgs.map(img => img.src)
  // });

  const imageSrcs = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('article img'));
    const srcSetAttribute = imgs.map(i => i.getAttribute('src'));
    return srcSetAttribute;
  })

  await browser.close();
  return imageSrcs;
}


function downloadImage(images, resultFolder) {
  for (let i = 0; i < images.length; i++) {
    const sr = images[i];
    const options = {
      url: sr,
      dest: resultFolder              
    }
    image_Download.image(options)
      .then(({ filename }) => {
        console.log('Saved to', filename)  
      })
      .catch((err) => console.error(err))
  }
}
  

async function main() {
  const resultFolder = './result';
  const urlLogin = 'https://www.instagram.com/';
  const urlDownloadPage = 'https://www.instagram.com/hot_sexy_asian_girrls/';

  createResultFolder(resultFolder);
 
  const images = await getImageURLs(urlLogin, urlDownloadPage);
  
  downloadImage(images, resultFolder)
  
}

main();




