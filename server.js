const express = require("express");
// const { prependListener } = require("node:process");
const path = require("path");
const app = express();

const PUERTO = 3000;
let usuarios =
    [
        {
            user: "nerea",
            pass: "123456"
        },
        {
            user: "pablo",
            pass: "38088"
        },
        {
            user: "pepe",
            pass: "123123"
        },
    ];
// Middleware para poner el contenido de un form post en req.body
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos de imagen, css, scripts, etc ("recursos estáticos")
app.use(express.static(__dirname));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "login.html"));
});

app.post("/login", function (req, res) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].user === req.body.user && usuarios[i].pass === req.body.password) {
            res.sendFile(path.join(__dirname, "bienvenido.html"));
        }
    }
    res.sendFile(path.join(__dirname, "login_error.html"));

});

app.post("/registro",function(request,response){
    for(let i = 0; i < usuarios.lenght; i++){
        if(usuarios[i].user === request.body.user){
            response.sendFile(path.join(__dirname,"registro.html"));
        }
    }

    if(request.body.password === request.body.password2){
        usuarios.push(
            {
                user: request.body.user,
                pass: request.body.password
            }
        );

        response.sendFile(path.join(__dirname,"login.html"));
    }else{
        response.sendFile(path.join(__dirname,"registro.html"));
        
    }
})

// Inicio server
app.listen(PUERTO, function () {
    console.log(`Servidor iniciado en puerto ${PUERTO}...`);
});

