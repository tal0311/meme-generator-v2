var gCanvas
var gCtx

function initEditor() {
  gCanvas = document.querySelector('canvas')
  console.log('gCanvas:', gCanvas)
  gCtx = gCanvas.getContext('2d')
  console.log('gCtx:', gCtx)
  renderEditor()
}

function renderEditor() {
  const meme = getMemeForDisplay()
  console.log('meme:', meme)
  if (!meme.url) {
    document.querySelector(
      '.meme-editor'
    ).innerHTML = `<h1 class="default-msg">Select Meme from galley to edit</h1>`
    return
  }

  const { imgUrl } = meme
  const img = new Image()
  img.src = imgUrl
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
  }
}
