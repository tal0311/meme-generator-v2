var gCanvas
var gCtx
var gElVideo
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function initEditor() {
  const elBody = document.querySelector('body')
  elBody.classList.add('editor')
  gCanvas = document.querySelector('canvas')
  gCtx = gCanvas.getContext('2d')
  gElVideo = document.querySelector('video')
  addListeners()
  renderCanvas()
}

async function renderCanvas(save = null, userMedia) {
  const meme = getMemeForDisplay()
  if (!meme.imgUrl) {
    renderDefaultMsg()
    return
  }
  const { imgUrl, lines, selectedLineIdx: lineIdx, emojis } = meme
  const img = new Image()
  img.src = imgUrl
  // for saving img without line focus
  await img.decode()
  const media = userMedia ? userMedia : img
  gCtx.drawImage(media, 0, 0, gCanvas.width, gCanvas.height)
  renderLines(lines)
  const color = save ? 'transparent' : 'black'
  renderFocusToLine(lines[lineIdx], color)
  renderEmojis(emojis)
}

function renderEmojis(emojis) {
  if (!emojis.length) return

  emojis.forEach((emoji) => {
    const { x, y, size, content } = emoji
    gCtx.beginPath()
    gCtx.font = `bold ${size}px`
    gCtx.strokeText(content, x, y)
    gCtx.closePath()
  })
}

function onRemoveLine() {
  removeLine()
  renderCanvas(true)
}

function onAddLine() {
  const { lines } = getMemeForDisplay()
  let x = gCanvas.width / 2
  let y = gCanvas.height - 50
  if (lines.length > 1) {
    const { height } = gCanvas
    y = getRandomInt(50, height - 50)
  }
  addLine(x, y)
  renderCanvas()
}
function onSelectEmoji(value) {
  addEmoji(value)
  renderCanvas()
}
function onChangeLine() {
  changeLine()
  renderInputValue()
  renderCanvas()
}
function onUpdateLine(value, type) {
  updateLine(value, type)
  renderCanvas()
}
function renderInputValue() {
  const elEditorPanel = document.querySelector('.editor-panel')
  const elInputs = elEditorPanel.querySelectorAll('input')

  const { selectedLineIdx: idx, lines } = getMemeForDisplay()
  const line = lines[idx]
  elInputs.forEach((input) => {
    const { name } = input
    input.value = line[name]
  })
}
function renderLines(lines) {
  lines.forEach((line) => {
    const { fillColor, x, y, size, txt, strokeColor, align, font } = line
    gCtx.beginPath()
    gCtx.textBaseline = 'top'
    gCtx.font = `bold ${size}px ${font}`
    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = strokeColor
    gCtx.textAlign = align
    gCtx.lineWidth = 2
    gCtx.letterSpacing = '2px'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
    gCtx.closePath()
    renderInputValue(line)
  })
}
function renderDefaultMsg() {
  document.querySelector(
    '.meme-editor'
  ).innerHTML = `<h1 class="default-msg">Select Meme from gallery to edit</h1>`
}
async function onSave(elLink, type = 'save') {
  await renderCanvas(true)
  downloadCanvas(elLink, type, gCanvas)
  const route = type === 'save' ? 'saved' : 'gallery'
  navigateTo(route)
}
function onShare() {
  console.log('share')
  uploadImg(gCanvas)
}
async function onSnap() {
  const elDialog = document.querySelector('dialog')
  elDialog.show()
  getMediaDevices(gElVideo)
}
async function takePhoto() {
  const elDialog = document.querySelector('dialog')
  elDialog.close()
  gCtx.drawImage(gElVideo, 0, 0, gCanvas.width, gCanvas.height)
  var dataUrl = gCanvas.toDataURL()
  setMeme(null, dataUrl)
  renderCanvas()
  gElVideo.srcObject = null
}
function renderFocusToLine({ x, y, txt, align }, color) {
  const measures = getLineMeasures(txt)
  setRectToTxt(x, y, align, measures, color)
}
function setRectToTxt(x, y, align, measures, color) {
  const { width, fontAscent, fontDecent } = measures
  const xAlign = setXAlignment(measures, align, x)
  gCtx.beginPath()
  gCtx.strokeStyle = '#537bc4'
  gCtx.strokeRect(xAlign - 10, y - fontAscent / 2, width + 20, fontDecent)
  gCtx.beginPath()

  gCtx.stroke()
}
function setXAlignment(measures, align, x) {
  const { width, rightAlign } = measures
  alignOpts = {
    center: x - rightAlign,
    right: x - width,
    default: x,
  }
  return alignOpts[align] || alignOpts['default']
}
function getLineMeasures(txt) {
  const {
    actualBoundingBoxRight: rightAlign,
    fontBoundingBoxAscent: fontAscent,
    fontBoundingBoxDescent: fontDecent,
    width,
  } = gCtx.measureText(txt)

  return {
    rightAlign,
    fontAscent,
    fontDecent,
    width,
  }
}
// listeners
function addListeners() {
  addMouseListeners()
  addTouchListeners()
  window.addEventListener('resize', () => {
    // resizeCanvas()
    const center = { x: gCanvas.width / 2, y: gCanvas.height / 2 }
    // createCircle(center)
    renderCanvas()
  })
}
function addMouseListeners() {
  gCanvas.addEventListener('mousemove', onMove)
  gCanvas.addEventListener('mousedown', onDown)
  gCanvas.addEventListener('mouseup', onUp)
}
function addTouchListeners() {
  gCanvas.addEventListener('touchmove', onMove)
  gCanvas.addEventListener('touchstart', onDown)
  gCanvas.addEventListener('touchend', onUp)
}
function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gCanvas.width = elContainer.offsetWidth
  gCanvas.height = elContainer.offsetHeight
}
// drag n drop
function onDown(ev) {
  const pos = getEvPos(ev)
  line = isLineClicked(pos)
  if (!line) return
  setLineDrag(line)
  document.body.style.cursor = 'grabbing'
}
function onMove(ev) {
  const { lineDragIdx: idx, lines } = getMemeForDisplay()
  if (!lines[idx]?.isDrag) return
  const pos = getEvPos(ev)
  moveCircle(pos)
  renderCanvas()
}
function onUp() {
  const { lines, lineDragIdx: idx } = getMemeForDisplay()
  setLineDrag(lines[idx])
  document.body.style.cursor = 'grab'
}
function getEvPos(ev) {
  var pos = {
    offsetX: ev.offsetX,
    offsetY: ev.offsetY,
  }
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      offsetX: ev.pageX - ev.target.offsetLeft,
      offsetY: ev.pageY - ev.target.offsetTop,
    }
  }
  return pos
}
