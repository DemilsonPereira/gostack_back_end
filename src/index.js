const express = require('express');
const cors = require('cors')
const { uuid, isUuid } = require('uuidv4');
const { request, response } = require('express');

const app = express();

app.use(cors());
app.use(express.json());


/**
 * Query Params: Filtros e Paginação / Usado no 'GET'
 * Route Params: Identificar recuros (Arualizar/Deletar) / Usado tanto no 'PUT'/'DELETE'
 * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)/ Usado tanto no 'POST'/'PUT'
 */

/**
 * Middleware
 * 
 * Interceptador de requisições que interromper totalmente a requisição ou altera dados da requisição.
 */

const projects = [];

function logRequests(req, res, next){
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  return next(); // Próximo Middleware
}

function validateProjectId(req, res,next){
  const { id } = req.params;

  if(!isUuid(id)){
    return res.status(400).json({ error: 'invalid project ID.'});
  }

  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);


app.get("/projects", (req, res) => {
  const { title } = req.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return res.json(results);
});

app.post("/projects", (req, res) => {
  const { title, owner } = req.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return res.json(project);
});

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;

  const projectIndex = projects.findIndex((project) => project.id == id);

  if (projectIndex < 0) {
    return res.status(400).json({
      error: "Project not found.",
    });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return res.json(project);
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex((project) => project.id == id);

  if (projectIndex < 0) {
    return res.status(400).json({
      error: "Project not found.",
    });
  }

  projects.splice(projectIndex, 1);

  return res.status(204).send();
});

app.listen(3333, () => {
  console.log("🚀 Back-end started!");
});
