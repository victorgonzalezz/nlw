const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))


//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true //utiliza a memória para responder mais rápido
})



//configurar caminhos da minha aplicação
//página inicial

server.get("/", (req, res) => {
     return res.render("index.html", { title: "Um título" })
})



server.get("/create-point", (req, res) => {

    //req.query: Query String da nossa utl
    //console.log(req.query)


    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body: O corpo do nosso formulário
    //console.log(req.body)

    //inserir dados no banco de dados
    
    const query = `
        INSERT INTO places ( 
        image,
        name,
        address,
        address2,
        state,
        city,
        items
        ) VALUES (?,?,?,?,?,?,?);
`   
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]  
    
    function afterInsertData(err) {
          if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.send("create-point.html", {saved: true})

    }


    db.run(query, values, afterInsertData) 



    
})






server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0})

    }



    //pegar os dados do bando de dados
    db.all(`SELECT * FROM places WHEHE city = '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        



        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })

})





//ligar o servidor
server.listen(3001)
