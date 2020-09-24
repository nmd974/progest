const db = require("../../../db");
const HttpError = require("../../../shared/http-error");
const { ObjectID } = require("mongodb");



const getTasksByProject =(req, res, next) => {
    let projects = [];
    const projectId = ObjectID(req.params.pid);


    try{
        db.getDb()
        .collection('tasks')
        .find({projectId: projectId})
        .forEach(project => {
            projects.push(project);
        })
        .then(result => {
            res.status(201).json({projects});
        })
    }catch (err){
        const error = new HttpError(
            'Liste des tâches non trouvée',
            500
        );
        return next(error);
    }
}

exports.getTasksByProject = getTasksByProject;