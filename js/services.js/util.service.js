function makeId(length = 5) {
  var txt = ''
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return txt
}

function uploadImg(canvas) {
  // Convert the canvas to data
  const imgDataUrl = canvas.toDataURL('image/jpeg')
  // A function to be called if request succeeds and the picture is uploaded to the server.
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)

    window.open(
      ` https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl} title="Share on Facebook" target="_blank"`
    )
  }
  doUploadImg(imgDataUrl, onSuccess)
}

// Uploading it to a server under the ocean.
function doUploadImg(imgDataUrl, onSuccess) {
  // Packing the img
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  // Uploading
  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log('Got back live url:', url)
      onSuccess(url)
    })
    .catch((err) => {
      console.error(err)
    })
}

function downloadCanvas(elLink, type, canvas) {
  const data = canvas.toDataURL()
  if (type === 'save') {
    saveMeme(data)
    return
  }
  elLink.href = data
  elLink.download = 'my-img.jpg'
}

function saveMeme(data) {
  console.log('data:', data)
  console.log('gMeme:', gMeme)
}
