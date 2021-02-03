const faker = require('faker')
const { hash } = require('bcryptjs')

const { date } = require('./src/lib/utils')

const Seeds = require('./src/app/models/Seeds')

// Faker - Create Users
let totalUsers = 3
let totalChefs = 6
let totalRecipes = 9

let usersIds = []
let chefsIds = []
let filesIds = []
let recipesIds = []

const fs = require('fs')
const request = require('request')

// Function Download Images
async function downloadImage(url, path) {
    let download = function(uri, filename, callback){
        request.head(uri, function(err, res, body){    
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };
      
    download(`${url}`, `${path}`, function(){
        console.log('Image downloaded successfully!')
    });
}

// Faker - Create USers
async function createUsers() {
    const users = []
    const password = await hash('123456', 8)

    while (users.length < totalUsers) {
        
        users.push({
            name: faker.name.firstName() + ' ' + faker.name.lastName(),
            email: faker.internet.email(),
            password,
            isAdmin: faker.random.boolean()
        })
    }

    const usersPromise = users.map(user => Seeds.Users(user))
    usersIds = await Promise.all(usersPromise)
}

// Faker - Create Chefs
async function createChefs() {
    const files = []

    while (files.length < totalChefs) {
        const url = faker.image.people()
        const fileFormatName = url.split('/')
        const name = fileFormatName[fileFormatName.length - 1]
        const randomName = name + date(Date.now()).year + date(Date.now()).month + date(Date.now()).day + Math.floor(Math.random() * 99)
        const path = `public/images/${randomName}.png`
        
        files.push({
            name: name,
            path: path
        })

        await downloadImage(url, path)
    }
    
    const chefFilePromise = files.map(file => Seeds.Files(file))
    filesIds = await Promise.all(chefFilePromise)
    
    const chefs = []

    while (chefs.length < totalChefs) {
        chefs.push({
            name: faker.name.firstName() + ' ' + faker.name.lastName(),
            file_id: filesIds[chefs.length],
        })
    }

    const chefPromise = chefs.map(chef => Seeds.Chefs(chef))
    chefsIds = await Promise.all(chefPromise)
}

// Faker - Create Recipes
async function createRecipes() {
    const recipes = []

    while(recipes.length < totalRecipes) {
        recipes.push({
            title: faker.commerce.productName(),
            chef_id: chefsIds[Math.floor(Math.random() * totalChefs)],
            user_id: usersIds[Math.floor(Math.random() * totalUsers)],
            ingredients: faker.random.arrayElements(),
            preparation: faker.random.arrayElements(),
            information: faker.lorem.paragraph(Math.ceil(Math.random() * 3))
        })
    }

    const recipePromise = recipes.map(recipe => Seeds.Recipes(recipe, recipe.user_id))
    recipesIds = await Promise.all(recipePromise)

    const files = []

    while (files.length < 5) {
        const url = faker.image.image()
        const fileFormatName = url.split('/')
        const name = fileFormatName[fileFormatName.length - 1]
        const randomName = name + date(Date.now()).year + date(Date.now()).month + date(Date.now()).day + Math.floor(Math.random() * 99)
        const path = `public/images/${randomName}.png`
        
        files.push({
            name: name,
            path: path
        })

        await downloadImage(url, path)
    }

    const recipeFilePromise = files.map(file => Seeds.Files(file))
    filesIds = await Promise.all(recipeFilePromise)

    
    const filesPromiseRecipe = recipesIds.map(recipeId => {

        const fileIdPromise = filesIds.map(file => {
            Seeds.RecipeFiles({ recipe_id: recipeId, file_id: file })
        })

        Promise.all(fileIdPromise)
    })

    await Promise.all(filesPromiseRecipe)
}

async function init() {
    await createUsers()
    await createChefs()
    await createRecipes()
}

init()