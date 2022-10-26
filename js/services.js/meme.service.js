const SAVED_KEY = 'savedDB'

var gSearchCountMap = { funny: 12, cat: 16, baby: 2 }

var gImgs = [
  { id: 1, url: 'assets/images/1.jpg', keywords: ['politics', 'funny', 'cat'] },
  { id: 1, url: 'assets/images/2.jpg', keywords: ['poppy', 'funny', 'cat'] },
  {
    id: 1,
    url: 'assets/images/3.jpg',
    keywords: ['poppy', 'baby', 'funny', 'cat'],
  },
  { id: 1, url: 'assets/images/4.jpg', keywords: ['sleep', 'cat'] },
  { id: 1, url: 'assets/images/5.jpg', keywords: ['baby'] },
  { id: 1, url: 'assets/images/6.jpg', keywords: ['funny', 'history'] },
  { id: 1, url: 'assets/images/7.jpg', keywords: ['kid', 'black'] },
  { id: 1, url: 'assets/images/8.jpg', keywords: ['crazy', 'funny'] },
  { id: 1, url: 'assets/images/9.jpg', keywords: ['baby'] },
  { id: 1, url: 'assets/images/10.jpg', keywords: ['obama', 'politics'] },
  {
    id: 1,
    url: 'assets/images/11.jpg',
    keywords: ['black', 'basket ball', 'love'],
  },
  { id: 1, url: 'assets/images/12.jpg', keywords: ['zadik', 'etgar'] },
  { id: 1, url: 'assets/images/13.jpg', keywords: ['leo', 'hollywood'] },
  { id: 1, url: 'assets/images/14.jpg', keywords: ['morpheus', 'hollywood'] },
]

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,

  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      align: 'left',
      color: 'red',
    },
  ],
}

function getImagesForDisplay() {
  return gImgs
}

function getMemeForDisplay() {
  return null
}

function getSavedForDisplay() {
  return loadFromStorage(SAVED_KEY)
}
