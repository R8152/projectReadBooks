const buscaInput = document.getElementById("busca-input")
const resultadoPesquisa = document.getElementById("resultado-pesquisa")
const spanUsuario = document.getElementById("span-usuario")
const divMeta = document.getElementById("span-usuario")

const usuario = JSON.parse(localStorage.getItem("usuarioLogado"))

if (!usuario){
    window.location.href = "./index.html"
}

spanUsuario.innerHTML = `Olá, ${usuario.nome}`

function getBooks(event){
    event.preventDefault()
    const pesquisaLivros = encodeURIComponent(buscaInput.value.trim())
    console.log(pesquisaLivros)
// 
    fetch(`https://openlibrary.org/search.json?q=${pesquisaLivros}&language=por`)
    .then(res => res.json())
    .then(dados =>{
        console.log(dados)
        const dadosBusca = dados.docs
        dadosBusca.map((book) => {
            const capa = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            //Decoração da div abaixo feita com a ajuda de ChatGPT
            resultadoPesquisa.innerHTML += `
            <div class="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 w-64">
                <img src="${capa}" alt="${book.title}" class="w-50 h-59 object-cover rounded-lg mb-4">
                <h2 class="text-lg font-bold text-gray-800 line-clamp-2">${book.title}</h2>
                <h3 class="text-sm text-gray-500 mt-2 mb-4">${book.author_name[0]}</h3>
                <button class="bg-blue-600 hover:bg-blue-800 text-white text-xl font-bold w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">+</button>
            </div>
                `    
    })

    })
    .catch(error => console.log(error.message)) //Mostra que está acontecendo um problema, mesmo com várias requisições
}
function handleLogout () {
    localStorage.clear() //Limpa todo o armazenamento local do site
    window.location.href = "./index.html"
}
function adicionarMeta(){
    divMeta.innerHTML += `
    <img src="${capa}" alt="${book.title}" class="w-50 h-59 object-cover rounded-lg mb-4">
    `
}
//Fazer um botão de remover uma meta e analisar outras coisas que estão faltando no meu repositório