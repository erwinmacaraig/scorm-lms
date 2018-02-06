import * as db from 'mysql2';
import * as mysql from 'mysql2/promise';
const dbconfig = require('../../dist/config/db.json');

export class Course {
    public dbData = {
        "intCourseId": 0,
        "strCourseName": '',
        "strCourseLauncher": ''
    };
    private courseId = 0;
    constructor(id:number = 0) {
        if (id) {
            this.courseId = id;
        }
    }
    public load(): Promise<object> {
        return new Promise((resolve, reject) => {
            const sql_load = `SELECT * FROM tblScormCourse WHERE intCourseId = ?`;
            const connection = db.createConnection(dbconfig);
            connection.query(sql_load, [this.ID()], (error, results, fields) => {
                if (error) {
                    console.log('course.model.load', error, sql_load);
                    throw new Error('There was a problem loading data model values');
                }
                if (results.length){
                    resolve(results[0]);
                } else {
                    reject({'message': 'No records found with course id: ' + this.ID()});
                }
            });
            connection.end();

        });

    }
    public ID() {
        return this.courseId;
    }
    public setID(id: number = 0) {
        this.courseId = id;
    }

}
