const db = require("../../../db");
const HttpError = require("../../../shared/http-error");
const { ObjectID } = require("mongodb");
const { Result } = require("express-validator");



const validateProject =(req, res, next) => {

    // const idProject = req.params.pid;
    const idProject = ObjectID(req.params.pid);
    const project = req.body;
    // console.log(req.body);
    // console.log(project.projectAdvancement)


    try{
        db.getDb()
        .collection('projects')
        .updateOne({_id: idProject}, {$set:{
            projectAdvancement: project.projectAdvancement,
            realEndedDate: new Date(),
            etat: "Terminée"
        }})

        .then(result => {
            res.status(201).json({message: "Tâche modifiée"});
        })
    }catch (err){
        const error = new HttpError(
            'Liste des projets introuvable pour cet utilisateur',
            500
        );
        return next(error); 
    }
    
    
}


// const updateProjectCancel =(req, res, next) => {

//     // const idProject = req.params.pid;
//     const idProject = ObjectID(req.params.pid);
//     const project = req.body[0];
//     console.log(idProject);
//     console.log(project.projectAdvancement)


//     try{
//         db.getDb()
//         .collection('projects')
//         .updateOne({_id: idProject}, {$set:{
//             realEndedDate: new Date(),
//             etat: "Annulée"
//         }})

//         .then(result => {
//             res.status(201).json({message: "Tâche annulée"});
//         })
//     }catch (err){
//         const error = new HttpError(
//             'Liste des projets introuvable pour cet utilisateur',
//             500
//         );
//         return next(error); 
//     }
    
    
// }

const updateProject =(req, res, next) => {

    // const idProject = req.params.pid;
    const idProject = ObjectID(req.params.pid);
    const project = req.body;
    // console.log(req.body);
    // console.log(project.projectAdvancement)
    //mettre les conditions s'il y a modif date nom etc...

    try{
        db.getDb()
        .collection('projects')
        .updateOne({_id: idProject}, {$set:{
            projectAdvancement: project.projectAdvancement,
        }})

        .then(result => {
            res.status(201).json({message: "Tâche modifiée"});
        })
    }catch (err){
        const error = new HttpError(
            'Liste des projets introuvable pour cet utilisateur',
            500
        );
        return next(error); 
    }
    
    
}


const updateProjectContent =(req, res, next) => {

    // const idProject = req.params.pid;
    const idProject = ObjectID(req.params.pid);
    const project = req.body;
    console.log(req.body);
    console.log(project);
    //mettre les conditions s'il y a modif date nom etc...

    try{
        db.getDb()
        .collection('projects')
        .updateOne({_id: idProject}, {$set:{
            projectName: project.projectName,
            description: project.description,
            startingDate: project.startingDate,
            previsionalEndedDate: project.previsionalEndedDate,
            etat: project.etat 
        }})

        .then(result => {
            res.status(201).json({message: "Tâche modifiée"});
        })
    }catch (err){
        const error = new HttpError(
            'Liste des projets introuvable pour cet utilisateur',
            500
        );
        return next(error); 
    }
    
    
}


// exports.updateProjectCancel = updateProjectCancel;
exports.validateProject = validateProject;
exports.updateProject = updateProject;
exports.updateProjectContent = updateProjectContent;