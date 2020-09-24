const db = require("../../../db");
const HttpError = require("../../../shared/http-error");
const { ObjectID } = require("mongodb");



const deleteProject =(req, res, next) => {

    // const idProject = req.params.pid;
    const idProject = ObjectID(req.params.pid);
    const project = req.body[0];
    // console.log(idProject);
    // console.log(project)


    try{
        db.getDb()
        .collection('projects')
        .deleteOne({_id: idProject})
        .then(result => {
            res.status(201).json({message: "Projet annulé"});
        })
    }catch (err){
        const error = new HttpError(
            'Impossible de supprimer ce projet',
            500
        );
        return next(error); 
    }
    
    
}

exports.deleteProject = deleteProject;