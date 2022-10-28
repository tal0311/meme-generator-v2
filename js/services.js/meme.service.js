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
      fillColor: '#ce3636',
      strokeColor: '#00000',
      font: 'impact',
      x: 250,
      y: 50,
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

function addLine(x, y) {
  console.log('addLine:')
  createLine('Enter your text', x, y)
}

function changeLine() {
  const { selectedLineIdx: idx, lines } = gMeme
  console.log('lines.length:  ', lines.length)
  console.log('idx:', idx)
  if (idx >= lines.length - 1) {
    gMeme.selectedLineIdx = 0
    return
  }

  gMeme.selectedLineIdx++
}
function getMemeById(memeId) {
  return gImgs.find((image) => image.id === +memeId)
}

function setLineProps(key, value) {
  const { selectedLineIdx: idx } = gMeme
  gMeme.lines[idx][key] = value
}
function updateLine(value, type) {
  const { selectedLineIdx: idx } = gMeme
  gMeme.lines[idx][type] = value
}
function createLine(txt, x, y) {
  gMeme.lines.push({
    txt,
    size: 40,
    align: 'center',
    fillColor: '#fd6dc8',
    strokeColor: '#000000',
    font: 'Impact',
    y,
    x,
  })
}
