const SAVED_KEY = 'savedDB'
var gFilterBy = 'ALL'
var gSearchCountMap = { funny: 12, cat: 16, baby: 2 }

var gImgs = [
  {
    id: 1,
    imgUrl: 'assets/images/1.jpg',
    keywords: ['politics', 'funny', 'cat'],
  },
  { id: 2, imgUrl: 'assets/images/2.jpg', keywords: ['poppy', 'funny', 'cat'] },
  {
    id: 3,
    imgUrl: 'assets/images/3.jpg',
    keywords: ['poppy', 'baby', 'funny', 'cat'],
  },
  { id: 4, imgUrl: 'assets/images/4.jpg', keywords: ['sleep', 'cat'] },
  { id: 5, imgUrl: 'assets/images/5.jpg', keywords: ['baby'] },
  { id: 6, imgUrl: 'assets/images/6.jpg', keywords: ['funny', 'history'] },
  { id: 7, imgUrl: 'assets/images/7.jpg', keywords: ['kid', 'black'] },
  { id: 8, imgUrl: 'assets/images/8.jpg', keywords: ['crazy', 'funny'] },
  { id: 9, imgUrl: 'assets/images/9.jpg', keywords: ['baby'] },
  { id: 10, imgUrl: 'assets/images/10.jpg', keywords: ['obama', 'politics'] },
  {
    id: 11,
    imgUrl: 'assets/images/11.jpg',
    keywords: ['black', 'basket ball', 'love'],
  },
  { id: 12, imgUrl: 'assets/images/12.jpg', keywords: ['zadik', 'etgar'] },
  { id: 13, imgUrl: 'assets/images/13.jpg', keywords: ['leo', 'hollywood'] },
  {
    id: 14,
    imgUrl: 'assets/images/14.jpg',
    keywords: ['morpheus', 'hollywood'],
  },
]

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  imgUrl: 'assets/images/2.jpg',
  lines: [
    {
      txt: 'I sometimes',
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
  let imgs = gImgs
  imgs = _filterImgs(gFilterBy, gImgs)
  return imgs.length > 1 ? imgs : gImgs
}

function _filterImgs(topic, imgs) {
  if (gFilterBy === 'ALL') return imgs
  return imgs.filter((img) => img.keywords.includes(topic))
}
function getMemeForDisplay() {
  return gMeme
}

function getSavedForDisplay() {
  return loadFromStorage(SAVED_KEY)
}

function setOptsForFilter() {
  let keywords = gImgs
    .map((img) => img.keywords.join(','))
    .join(',')
    .split(',')
  return ['ALL', ...new Set(keywords)]
}
function setMeme(memeId, userMedia = false) {
  debugger
  const meme = getMemeById(memeId)
  console.log('meme:', meme)
  if (meme) {
    gMeme.imgUrl = meme.imgUrl
    gMeme.selectedImgId = +memeId
    meme.lines && (gMeme = meme)
    return
  }
  if (userMedia) {
    gMeme.imgUrl = userMedia
  }
  console.log('gMeme:', gMeme)
}

function addLine(x, y) {
  console.log('addLine:')
  createLine('Enter your text', x, y)
}

function removeLine() {
  const { selectedLineIdx: idx } = gMeme
  gMeme.lines.splice(idx, 1)
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
  const meme = gImgs.find((image) => image.id === +memeId)
  const savedMems = getSavedForDisplay()
  const savedMeme = savedMems.find((image) => image.id === memeId)
  return meme || savedMeme
}

function setLineProps(key, value) {
  const { selectedLineIdx: idx } = gMeme
  gMeme.lines[idx][key] = value
}

function updateLine(value, type) {
  const { selectedLineIdx: idx } = gMeme
  typeof value === 'number'
    ? (gMeme.lines[idx][type] += value)
    : (gMeme.lines[idx][type] = value)
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

function filterBy(topic) {
  gFilterBy = topic
}
