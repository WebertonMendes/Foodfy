const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .menu a", "header .menu-site a")

for (item of menuItems) {
  if(currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active")
  }
}

function showHideIngredients() {
  const recipeIngredients = document.querySelector('.recipe-ingredients')
  const buttonShowHideIngredients = document.querySelector('#button-ingredients')

  recipeIngredients.classList.toggle('hide')
  
  if (recipeIngredients.classList.length > 1) {
    buttonShowHideIngredients.innerHTML = ('Exibir')
  } else {
    buttonShowHideIngredients.innerHTML = ('Esconder')
  }
}

function showHidePreparation() {
  const recipePreparation = document.querySelector('.recipe-preparation')
  const buttonShowHidePreparation = document.querySelector('#button-preparation')

  recipePreparation.classList.toggle('show')
  
  if (recipePreparation.classList.length > 1) {
    buttonShowHidePreparation.innerHTML = ('Esconder')
  } else {
    buttonShowHidePreparation.innerHTML = ('Exibir')
  }
}

function showHideInformation() {
  const recipeInformation = document.querySelector('.recipe-information')
  const buttonShowHideInformation = document.querySelector('#button-information')

  recipeInformation.classList.toggle('show')
  
  if (recipeInformation.classList.length > 1) {
    buttonShowHideInformation.innerHTML = ('Esconder')
  } else {
    buttonShowHideInformation.innerHTML = ('Exibir')
  }
}

function addIngredient() {
  const ingredients = document.querySelector("#ingredients")
  const fieldContainer = document.querySelectorAll(".ingredient")
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

  if (newField.children[0].value == "") return false

  newField.children[0].value = ""
  ingredients.appendChild(newField)
}

function addPreparate() {
  const ingredients = document.querySelector("#preparation")
  const fieldContainer = document.querySelectorAll(".preparate")
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

  if (newField.children[0].value == "") return false

  newField.children[0].value = ""
  ingredients.appendChild(newField)
}

function paginate(selectedPage, totalPages) {
  
  let pages = [], oldPage

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    
    const firstAndLastPages = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

    if(firstAndLastPages || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
      if(oldPage && currentPage - oldPage > 2) {
        pages.push("...")
      }

      if(oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1)
      }

      pages.push(currentPage)

      oldPage = currentPage
    }
  }

  return pages
}

function createPagination(pagination) {
  const filter = pagination.dataset.filter
  const page = +pagination.dataset.page
  const total = +pagination.dataset.total
  const pages =  paginate(page, total)
  
  let elements = ""
  
  for (let page of pages) {
    if(String(page).includes("...")) {
      elements += `<span>${page}</span>`
    } else {
      if(filter) {
        elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
      } else {
        elements += `<a href="?page=${page}">${page}</a>`
      }
    }
  }
  
  pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if (pagination) {
  createPagination(pagination)
}

function editLink() {
  const editLink = document.querySelectorAll(".edit-link")
  
  for (let i = 0; i < editLink.length; i++) {
    const getLink = editLink[i]

    function newLink() {
      window.location.href = document.URL+'/edit'
    }

    if (getLink) newLink()
  }
}

const ImagesRecipeUpload = {
  input: "",
  preview: document.querySelector('#images-preview'),
  uploadLimit: 5,
  files: [],
  handleFileInput(event) {
      const { files: fileList } = event.target
      ImagesRecipeUpload.input = event.target

      if(ImagesRecipeUpload.hasLimit(event)) return

      Array.from(fileList).forEach(file => {
          
          ImagesRecipeUpload.files.push(file)
          
          const reader = new FileReader()

          reader.onload = () => {
              const image = new Image()
              image.src = String(reader.result)

              const div = ImagesRecipeUpload.getContainer(image)
              ImagesRecipeUpload.preview.appendChild(div)
          }

          reader.readAsDataURL(file)
      })

      ImagesRecipeUpload.input.files = ImagesRecipeUpload.getAllFiles()

  },
  hasLimit(event) {
      const { uploadLimit, input, preview } = ImagesRecipeUpload
      const { files: fileList } = input

      if(fileList.length > uploadLimit) {
          alert(`Envie no máximo ${uploadLimit} fotos.`)
          event.preventDefault()
          return true
      }

      const imagesDiv = []
      preview.childNodes.forEach(item => {
          if (item.classList && item.classList.value == "image")
          imagesDiv.push(item)
      })

      const totalImages = fileList.length + imagesDiv.length
      if(totalImages > uploadLimit) {
          alert("Você atingiu o limite máximo de fotos.")
          event.preventDefault()
          return true
      }

      return false
  },
  getAllFiles() {
      const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

      ImagesRecipeUpload.files.forEach(file => dataTransfer.items.add(file))

      return dataTransfer.files
  },
  getContainer(image) {
      const div = document.createElement('div')
      div.classList.add('image')

      div.onclick = ImagesRecipeUpload.removeImage

      div.appendChild(image)

      div.appendChild(ImagesRecipeUpload.getRemoveButton())

      return div
  },
  getRemoveButton() {
      const button = document.createElement('i')
      button.classList.add('material-icons')
      button.innerHTML = "delete"
      return button
  },
  removeImage(event) {
      const imageDiv = event.target.parentNode
      const imagesArray = Array.from(ImagesRecipeUpload.preview.children)
      const index = imagesArray.indexOf(imageDiv)

      ImagesRecipeUpload.files.splice(index, 1)
      ImagesRecipeUpload.input.files = ImagesRecipeUpload.getAllFiles()

      imageDiv.remove()
  },
  removeOldImage(event) {
      const imageDiv = event.target.parentNode

      if(imageDiv.id) {
          const removedFiles = document.querySelector('input[name="removed_files"]')
          if(removedFiles) {
              removedFiles.value += `${imageDiv.id},`
          }
      }

      imageDiv.remove()
  }
}

const ImageGallery = {
  highlight: document.querySelector('.highlight > img'),
  tumbmails: document.querySelectorAll('.tumbmail img'),
  setImage(event) {
      const { target } = event

      ImageGallery.tumbmails.forEach(tumbmail => tumbmail.classList.remove('active'))
      target.classList.add('active')

      ImageGallery.highlight.src = target.src
  }
}

const Validate = {
  apply(input, func) {
    Validate.clearErrors(input)
    
    let results = Validate[func](input.value)
    input.value = results.value

    if (results.error)
      Validate.displayError(input, results.error)
  },
  displayError(input, error) {
    const div = document.createElement('div')
    div.classList.add('error-field')
    div.innerHTML = error
    input.parentNode.appendChild(div)
    input.focus()
  },
  clearErrors(input) {
    const errorDiv = input.parentNode.querySelector(".error-field")

    if(errorDiv)
      errorDiv.remove()
  },
  isEmail(value) {
    let error = null
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    
    if (!value.match(mailFormat))
      error = "Email Inválido!"

    return {
      error,
      value
    }
  }
}