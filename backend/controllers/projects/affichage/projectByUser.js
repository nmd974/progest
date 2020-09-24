const db = require("../../../db");
const HttpError = require("../../../shared/http-error");



const getProjectByUser =(req, res, next) => {
    let projects = [];
    const user = req.params.pid;

    try{
        db.getDb()
        .collection('projects')
        .find({projectManager: user})
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

exports.getProjectByUser = getProjectByUser;