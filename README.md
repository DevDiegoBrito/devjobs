# DevJobs

# DevJobs

Un job board sencillo para roles de tecnología. Lo construí para practicar cosas de DevOps y tener algo que mostrar en mi GitHub.

Stack: HTML, CSS y vanilla JS. Sin frameworks, sin build step. Usa Docker + nginx para correr localmente y GitHub Actions para hacer deploy a GitHub Pages de forma automática.

![Deploy](https://github.com/DevDiegoBrito/devjobs/actions/workflows/deploy.yml/badge.svg)

---

## Demo en vivo

👉 https://DevDiegoBrito.github.io/devjobs

---

## Correr localmente

**Con Docker (recomendado):**

```bash
make run
```

Luego abrir http://localhost:8080

Para detenerlo:

```bash
make stop
```

**Sin Docker:**

Abrir `index.html` directamente en el browser. Como cargamos un archivo JSON local, puede que el browser tire un error de CORS. En ese caso usar un servidor simple:

```bash
---

## Estructura del proyecto

```
devjobs/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── data/
│   └── jobs.json        ← listado de trabajos (datos mockeados por ahora)
├── .github/
│   └── workflows/
│       └── deploy.yml   ← deploy automático a GitHub Pages en cada push a main
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── Makefile
```

---

## Cómo funciona el deploy

Cada push a `main` dispara el workflow de GitHub Actions en `.github/workflows/deploy.yml`. Usa las actions oficiales de GitHub Pages para subir y desplegar los archivos estáticos. No se necesita ningún build process porque todo es HTML/CSS/JS puro.

Hay que habilitar GitHub Pages en la configuración del repo primero:
- Settings → Pages → Source → GitHub Actions

---

## Qué aprendí / usé

- Docker + nginx para servir sitios estáticos (más realista que `python -m http.server`)
- GitHub Actions para CI/CD (sin deploys manuales)
- Makefile para simplificar comandos comunes
- Vanilla JS con async/await para cargar el JSON
- CSS custom properties y grid layout

---

## Cosas que quiero agregar eventualmente

- [ ] Paginación o infinite scroll
- [ ] URL de detalle por trabajo (para poder compartir el link de una oferta específica)
- [ ] Toggle dark/light mode
- [ ] Algún tipo de backend para guardar ofertas reales

---

## Configuración para tu propio GitHub

1. Hacer fork o clonar el repo
2. Actualizar la URL del badge en este README con tu usuario
3. En Settings → Pages del repo, configurar Source como **GitHub Actions**
4. Hacer push a `main` y debería desplegarse automáticamente

---

*Proyecto de práctica y portfolio. No es un job board real.*
