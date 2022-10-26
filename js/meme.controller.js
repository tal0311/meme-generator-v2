var gCanvas
var gCtx

function initEditor() {
  gCanvas = document.querySelector('canvas')
  gCtx = gCanvas.getContext('2d')
  renderEditor()
}

function renderEditor() {
  const meme = getMemeForDisplay()
  if (!meme) {
    document.querySelector(
      '.meme-editor'
    ).innerHTML = `<h1 class="default-msg">Select Meme from galley to edit</h1>`
    return
  }
  const img = new Image()
  img.src = 'img/1.jpg'
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
  }
}
