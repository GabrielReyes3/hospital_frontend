Hospital Frontend

Proyecto frontend para sistema hospitalario desarrollado con Angular 19 y PrimeNG 19.

Estructura del proyecto

HOSPITAL_FRONTEND
├── angular
├── vscode
├── node_modules
├── public
├── SIC
├── app
│ ├── pages
│ │ └── auth
│ │ ├── login
│ │ └── register
│ ├── app.component.css
│ ├── app.component.html
│ ├── app.component.spec.ts
│ ├── app.component.ts
│ ├── app.config.ts
│ ├── app.routes.ts
│ ├── index.html
│ ├── main.ts
│ ├── styles.css
├── .editorconfig
├── .gitignore
├── angular.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json

Requisitos

Node.js v18 o superior

npm v9 o superior

Angular CLI (opcional pero recomendado)

Instrucciones para ejecutar el proyecto

Clonar el repositorio
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio

Instalar dependencias
npm install

Levantar el servidor de desarrollo
ng serve

Abrir en el navegador
Abrir http://localhost:4200 para ver la aplicación corriendo en modo desarrollo.

Notas

El proyecto utiliza PrimeNG 19 para los componentes UI.

La carpeta principal con el código Angular está en app/.

Los estilos globales están en styles.css.

Los archivos de rutas y configuración se encuentran en la raíz de app/.

Comandos útiles

ng build - Genera una versión de producción en la carpeta dist/.

ng test - Ejecuta pruebas unitarias.

ng lint - Corre el linter para verificar calidad de código.

Autor

Gabriel Reyes

