function initSaved() {
  console.log('%c Saved init', 'color:lightgreen')
  renderSaved()
}

function renderSaved() {
  let images = getSavedForDisplay()

  if (!images) {
    document.querySelector(
      '.saved'
    ).innerHTML = `<h1 class="default-msg">No saved Meme at this time</h1>`
    return
  }
  const strHtmls = images
    .map((img) => {
      const { imgUrl, id } = img
      return `
    <article class="image-preview" onclick="onSelectMeme('${id}')" >
            <img src="${imgUrl}" alt="" />
    </article>
    `
    })
    .join('')
  document.querySelector('.saved-image-list').innerHTML = strHtmls
}
