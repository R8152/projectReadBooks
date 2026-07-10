const usuarioAutenticado = localStorage.getItem("usuarioLogado")
const btnLogin = document.getElementById("btn-login")
const btnCadastro = document.getElementById("btn-cadastro")
const formLogin = document.getElementById("form-login")
const formCadastro = document.getElementById("form-cadastro")
const divSenha = document.getElementById("div-senha")
const divAlert = document.getElementById("div-alert")
const divLogin = document.getElementById("div-login")
const spanLoading = document.getElementById("span-loading")

if (usuarioAutenticado) {
    window.location.href = "./dashboard.html"
}


btnCadastro.addEventListener("click", () =>{
    btnLogin.classList.remove("bg-[#006970]", "text-white")
    btnCadastro.classList.add("bg-[#006970]", "text-white")
    formCadastro.classList.remove("hidden")
    formLogin.classList.add("hidden")
})
btnLogin.addEventListener("click", () => {
    btnCadastro.classList.remove("bg-[#006970]", "text-white")
    btnLogin.classList.add("bg-[#006970]", "text-white")
    formLogin.classList.remove("hidden")
    formCadastro.classList.add("hidden")
})

function handleLogin(event){
    event.preventDefault()
    const emailLogin = document.getElementById("emailLogin").value
    const senhaLogin = document.getElementById("senhaLogin").value
    fetch("http://localhost:3000/usuarios")
    .then(res => res.json())
    .then(dados => {
        const usuarios = dados
        console.log(dados)
        const usuario = usuarios.find((usuario) => 
        emailLogin === usuario.email && senhaLogin === usuario.senha
    )
    console.log(usuario)
    if (usuario) {
        const usuarioLocal = { email: usuario.email, nome: usuario.nome}
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLocal))
        window.location.href = "./dashboard.html"
    } else {
        divSenha.removeChild(divSenha.lastChild)
        const alerta = document.createElement("p");
        alerta.textContent = "Email ou senha incorretos"
        alerta.classList.add("text-red-500")
        divSenha.appendChild(alerta)
    }    
    })
    .catch(error => {
        console.error(error)
        divAlert.classList.remove("hidden")
        divAlert.innerHTML = `<p>Erro na conexão. Tente novamente mais tarde!</p>`
        divLogin.classList.remove("hidden")
        spanLoading.classList.add("hidden")
    setTimeout(() => {
        divAlert.classList.add("hidden")
    }, 3000)
    })
}
function handleCadastro(event){
    event.preventDefault()
    const nomeCadastro = document.getElementById("nome").value
    const emailCadastro = document.getElementById("emailCadastro").value
    const senhaCadastro = document.getElementById("senhaCadastro").value
}