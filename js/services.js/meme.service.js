const SAVED_KEY = 'savedDB'

var gSearchCountMap = { funny: 12, cat: 16, baby: 2 }

var gImgs = [
  { id: 1, url: 'assets/images/1.jpg', keywords: ['politics', 'funny', 'cat'] },
  { id: 2, url: 'assets/images/2.jpg', keywords: ['poppy', 'funny', 'cat'] },
  {
    id: 3,
    url: 'assets/images/3.jpg',
    keywords: ['poppy', 'baby', 'funny', 'cat'],
  },
  { id: 4, url: 'assets/images/4.jpg', keywords: ['sleep', 'cat'] },
  { id: 5, url: 'assets/images/5.jpg', keywords: ['baby'] },
  { id: 6, url: 'assets/images/6.jpg', keywords: ['funny', 'history'] },
  { id: 7, url: 'assets/images/7.jpg', keywords: ['kid', 'black'] },
  { id: 8, url: 'assets/images/8.jpg', keywords: ['crazy', 'funny'] },
  { id: 9, url: 'assets/images/9.jpg', keywords: ['baby'] },
  { id: 10, url: 'assets/images/10.jpg', keywords: ['obama', 'politics'] },
  {
    id: 11,
    url: 'assets/images/11.jpg',
    keywords: ['black', 'basket ball', 'love'],
  },
  { id: 12, url: 'assets/images/12.jpg', keywords: ['zadik', 'etgar'] },
  { id: 13, url: 'assets/images/13.jpg', keywords: ['leo', 'hollywood'] },
  { id: 14, url: 'assets/images/14.jpg', keywords: ['morpheus', 'hollywood'] },
]

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  imgUrl: 'assets/images/2.jpg',
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 40,
      align: 'center',
      fillColor: '#fff',
      strokeColor: '#000',
      font: 'impact',
    },
  ],
}

function getImagesForDisplay() {
  return gImgs
}

function getMemeForDisplay() {
  return gMeme
}

function getSavedForDisplay() {
  return loadFromStorage(SAVED_KEY)
}

function setMeme(memeId) {
  const meme = getMemeById(memeId)
  console.log('meme:', meme)
  if (meme) {
    gMeme.imgUrl = meme.url
    gMeme.selectedImgId = +memeId
  }
  console.log('gMeme:', gMeme)
}

function getMemeById(memeId) {
  return gImgs.find((image) => image.id === +memeId)
}

function setLineProps(key, value) {
  const { selectedLineIdx: idx } = gMeme
  gMeme.lines[idx][key] = value
}

function createLine(txt = 'Enter your text') {
  gMeme.lines.push({
    txt,
    size: 40,
    align: 'center',
    fillColor: '#fff',
    strokeColor: '#000',
    font: 'Impact',
  })
}
