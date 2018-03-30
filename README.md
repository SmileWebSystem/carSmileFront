# README #

This README would normally document whatever steps are necessary to get your application up and running.

### Aplicacion movil front de carSmileFront para la consulta de vehiculos por placa  ###

* Aplicacion IONIC 2.0 con Angular 4
* 2.0.1
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* correr: npm install

* correr app: ionic serve -c

* Probar en ionic view: se encuentra configurado con git en la rama master
* Consola: https://dashboard.ionicjs.com/apps


### Caracteristicas
* Utiliza firebase
* El back esta desplegado en heroku


### Degug
* Para realiza debug se debe ajustar el launch.json asi:

{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "sourceMaps": true,
            "url": "http://localhost:8100",
            "webRoot": "${workspaceRoot}/www"
        },
        {
            "type": "chrome",
            "request": "attach",
            "name": "Attach to Chrome",
            "port": 9222,
            "webRoot": "${workspaceRoot}"
        }
    ]
}

* Correr la aplicacion asi: ionic serve -b
* Mas info: http://www.damirscorner.com/blog/posts/20161122-DebuggingIonic2AppsInChromeFromVisualStudioCode.html