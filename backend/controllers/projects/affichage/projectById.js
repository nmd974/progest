const db = require("../../../db");
const HttpError = require("../../../shared/http-error");
const { ObjectID } = require("mongodb");



const getProjectById =(req, res, next) => {
    let projects = [];
    const projectID = ObjectID(req.params.pid);
    // console.log(projectID);
    
    try{
        db.getDb()
        .collection('projects')
        .find({_id: projectID})
        .forEach(project => {
            projects.push(project);
        })
        .then(result => {
            res.status(201).json({projects});
        })
    }catch (err){
        const error = new HttpError(
            'Liste des projets introuvable pour cet utilisateur',
            500
        );
        return next(error);
    }
}

exports.getProjectById = getProjectById;