function onInit() {
  console.log('%c Gallery init', 'color:lightgreen')
  navigateTo()
}

function navigateTo(route = 'gallery') {
  const pages = [...document.querySelectorAll('.page')]
  pages.forEach((page) => {
    return !page.classList.contains(route)
      ? (page.hidden = true)
      : (page.hidden = false)
  })
  renderBy(route)
}

function renderBy(route) {
  switch (route) {
    case 'gallery':
      renderGallery()
      break
    case 'saved':
      // in saved controller
      initSaved()
      break
    case 'editor':
      // in editor controller
      initEditor()
      break
  }
}

function renderGallery() {
  let images = getImagesForDisplay()

  const strHtmls = images
    .map((img) => {
      const { id, url } = img
      return `
    <article class="image-preview" onclick="onSelectMeme('${id}')">
            <img src="${url}" alt="" />
    </article>
    `
    })
    .join('')
  document.querySelector('.image-list').innerHTML = strHtmls
}

function onSelectMeme(memeId) {
  setMeme(memeId)
  navigateTo('editor')
}
