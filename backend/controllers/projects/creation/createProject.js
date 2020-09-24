const db = require("../../../db");
const HttpError = require("../../../shared/http-error");


const createNewProject =(req, res, next) => {
    let projects = req.body;
    // const projectID = ObjectID(req.params.pid);
    // console.log(req.body);
    
    try{
        db.getDb()
        .collection('projects')
        .insertOne({        
            projectName: projects.projectName,
            description: projects.description,
            startingDate: projects.startingDate,
            previsionalEndedDate: projects.previsionalEndedDate,
            projectAdvancement: projects.projectAdvancement,
            projectManager: projects.projectManager,
            etat: projects.etat
        })
        .then(result => {
            res.status(201).json({projects});
        })
    }catch (err){
        const error = new HttpError(
            "Impossible d'ajouter un nouveau projet",
            500
        );
        return next(error);
    }
}

exports.createNewProject = createNewProject;