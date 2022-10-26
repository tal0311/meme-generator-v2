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
      renderGallery(route)
      break
    case 'saved':
      renderSaved(route)
      break
    case 'editor':
      renderEditor(route)
      break
  }
}
