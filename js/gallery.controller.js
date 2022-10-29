function onInit() {
  console.log('%c Gallery init', 'color:lightgreen')
  navigateTo()
}

function navigateTo(route = 'gallery') {
  const pages = [...document.querySelectorAll('.page')]
  const elBody = document.querySelector('body')
  pages.forEach((page) => {
    route === 'gallery' && elBody.classList.remove('editor')
    !page.classList.contains(route)
      ? (page.hidden = true)
      : (page.hidden = false)
  })
  renderBy(route)
  setActiveClass(route)
}

function setActiveClass(route) {
  const elLinks = document.querySelectorAll('header a')
  elLinks.forEach((link) => {
    link.classList.remove('active')
    if (link.name === route) link.classList.add('active')
  })
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
      const { id, imgUrl } = img
      return `
    <article class="image-preview" onclick="onSelectMeme('${id}')">
            <img src="${imgUrl}" alt="" />
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
