function onInit() {
  console.log('%c Gallery init', 'color:lightgreen')
  navigateTo()
}

function navigateTo(route = 'gallery') {
  const pages = [...document.querySelectorAll('.page')]
  pages.map((page) => {
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
      const { url } = img
      return `
    <article class="image-preview">
            <img src="${url}" alt="" />
    </article>
    `
    })
    .join('')
  document.querySelector('.image-list').innerHTML = strHtmls
}
