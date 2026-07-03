const buscaInput = document.getElementById("busca-input")
const resultadoPesquisa = document.getElementById("resultado-pesquisa")

function getBooks(event){
    event.preventDefault()
    const pesquisaLivros = encodeURIComponent(buscaInput.value.trim())
    console.log(pesquisaLivros)
// https://covers.openlibrary.org/b/id/${cover_i}-M.jpg
    fetch(`https://openlibrary.org/search.json?q=${pesquisaLivros}&language=por`)
    .then(res => res.json())
    .then(dados =>{
        console.log(dados)
        const dadosBusca = dados.docs
        dadosBusca.map((book) => (
            resultadoPesquisa.innerHTML = `
                <div>
                    <img src="" alt="">
                    <h2>${book.title}</h2>
                    <h3>${book.author_name[0]}</h3>
                    <button>+</button>
                </div>
                `    
        ))

    })
    .catch(error => console.log(error.message))
}