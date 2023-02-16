import QuestionPaper from '../models/questionPaper.model.js';
import db from '../db/init.js';
import fs from 'fs'
import admin from "firebase-admin"
const storage = admin.storage();
const bucket = storage.bucket("gs://it-repeats-ea39a.appspot.com/");
let fileurl;
const saveQuestionPaper = async (req, res) => {

    // let filepath=req.file.path;
    // try {
    //     await bucket.upload(req.file.path, {
    //         metadata: {
    //             contentType: "image/png image/jpg, application/pdf"
    //         }
    //     });
    //     console.log("Pdf Uploaded");
    // } catch (err) {
    //     console.log(err);
    // }

    // const file = await bucket.file(req.file.originalname);
    // const fileName = req.file.originalname;
    // console.log(req.file.originalname);
    // await file.getSignedUrl({
    //     action: 'read',
    //     expires: '03-09-2491',
    // }).then(url => {
    //     fileurl = url;
    // }).catch(err => {
    //     console.log(err);
    // })

    // await fs.unlink(req.file.path, function (err) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         console.log("Deleted the file");
    //     }
    // })
    // let questionPaper = new QuestionPaper(req.body.departmentName, req.body.semester, req.body.subjectName, req.body.year, req.body.examName, fileurl[0], req.body.uid, fileName);

    // let returnValue = await questionPaper.save();
    // if (returnValue) {
    //     res.status(200).send({
    //         'message': 'Saved!',
    //         success: true
    //     });
    // }
    // else {
    //     res.status(401).send({
    //         'message': 'Paper is not Saved try again',
    //         success: false,
    //     });
    // }
    res.status(200).send({
                'message': 'Saved 1',
                success: true
            });
}


const getQuestionPaper = async (req, res) => {
    const { departmentName, subjectName, semester, year, examName } = req.query;
    let query = db.collection('questionPaper');

    if (departmentName) {
        query = query.where('departmentName', '==', departmentName);
    }

    if (subjectName) {
        query = query.where('subjectName', '==', subjectName);
    }

    if (semester) {
        query = query.where('semester', '==', semester);
    }

    if (year) {
        query = query.where('year', '==', year);
    }

    if (examName) {
        query = query.where('examName', '==', examName);
    }

    const b = await query.get();
    console.log(b);
    if (!b) {
        return res.status(501).json({
            message: "Internal Server Error",
            success: false
        })
    }
    let papers = [];
    b.forEach(element => {
        papers.push({
            id: element.id,
            ...element.data()
        });
    });
    if (papers.length === 0) {
        return res.status(501).json({
            message: "QP has not been added yet for the entered details",
            success: false
        })
    }
    return res.status(200).json({
        success: true,
        message: "Successfully sent the details",
        data: papers
    });
}
const deleteQp = async (req, res) => {
    const fileId = req.params.id;
    console.log(fileId);
    //   let file=await db.collection('questionPaper').where('id',"==",fileId);
    //   let x= file.get().then(function(query){
    //     query.forEach(function(doc){
    //         doc.ref.delete();
    //     });
    //   })
    let x = db.collection('questionPaper').doc(fileId).delete().then(() => {
        return res.status(200).json({
            success: true,
            message: "Successfully deleted the QP",
        });

    }).catch(err => {
        console.log(err);
        return res.status(401).json({
            success: false,
            message: "Failed to delete QP try again"
        });
    });
};
export { saveQuestionPaper, getQuestionPaper, deleteQp };