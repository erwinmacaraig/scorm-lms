import * as db from 'mysql2';
import * as Promise from 'promise';
const dbconfig = require('../../dist/config/db.json');

export class CourseUserRelation {
    constructor() {}

    public getRelation(user: number = 0, course: number = 0): Promise<number> {
        return new Promise((resolve, reject) => {
            const sql_get = `SELECT
                                intCourseUserRelationId
                            FROM
                                tblCourseUserRelation
                            WHERE
                                intUserId = ? 
                            AND
                                intCourseId = ?`;
            const connection = db.createConnection(dbconfig);
            connection.query(sql_get, [user, course], (error, results, fields) => {
                if (error) {
                    console.log('cours-user-relation.model', error, sql_get);
                    throw new Error('There was an error getting relationship');
                }
                if (results.length){
                    resolve(results[0]['intCourseUserRelationId']);
                } else {
                    reject({
                        'message': 'There are no relation between user and course'
                    });
                }
            });
            connection.end();
        });
    }
}