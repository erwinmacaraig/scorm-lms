import * as db from 'mysql2';
import * as mysqlpromise from 'mysql2/promise';
import * as Promise from 'promise';
const dbconfig = require('../../dist/config/db.json');

export class Scorm {
    constructor() {

    }

    public init(relationId: number = 0) {
        return new Promise((resolve, reject) => {
            this.checkRelationExist(relationId).then((exists) => {
                if (exists) {                    
                    resolve(true);
                } else {
                    const sql_init = `INSERT INTO tblScorm (intCourseUserRelationId, strParameterName, strParameterValue) 
                    VALUES  
                      (${relationId}, 'cmi.core._children', ''),
                      (${relationId}, 'cmi.core.student_id', ''),
                      (${relationId}, 'cmi.core.student_name', ''),
                      (${relationId}, 'cmi.core.lesson_location', ''),
                      (${relationId}, 'cmi.core.credit', ''),
                      (${relationId}, 'cmi.core.lesson_status', 'not attempted'),
                      (${relationId}, 'cmi.core.entry', ''),
                      (${relationId}, 'cmi.core.score_children', ''),
                      (${relationId}, 'cmi.core.score.raw', 0),
                      (${relationId}, 'cmi.core.score.max', 0),
                      (${relationId}, 'cmi.core.score.min', 0),
                      (${relationId}, 'cmi.core.total_time', '0000:00:00.00'),
                      (${relationId}, 'cmi.core.lesson_mode', 'normal'),
                      (${relationId}, 'cmi.core.exit', ''),
                      (${relationId}, 'cmi.core.session_time', '0000:00:00.00'),
                      (${relationId}, 'cmi.suspend_data', ''),
                      (${relationId}, 'cmi.launch_data', ''),
                      (${relationId}, 'cmi.comments', ''),
                      (${relationId}, 'cmi.comments_from_lms', ''),
                      (${relationId}, 'cmi.objectives._children', ''),
                      (${relationId}, 'cmi.objectives._count', ''),
                      (${relationId}, 'cmi.objectives.n.id', ''),
                      (${relationId}, 'cmi.objectives.n.score._children', ''),
                      (${relationId}, 'cmi.objectives.n.score.raw', ''),
                      (${relationId}, 'cmi.objectives.n.score.max', ''),
                      (${relationId}, 'cmi.objectives.n.score.min', ''),
                      (${relationId}, 'cmi.objectives.n.status', 'not attempted'),
                      (${relationId}, 'cmi.student_data._children', ''),
                      (${relationId}, 'cmi.student_data.mastery_score', 0),
                      (${relationId}, 'cmi.student_data.max_time_allowed', '0000:00:00.00'),
                      (${relationId}, 'cmi.student_data.time_limit_action', 'exit.message'),
                      (${relationId}, 'cmi.student_preference._children', ''),
                      (${relationId}, 'cmi.student_preference.audio', ''),
                      (${relationId}, 'cmi.student_preference.language',''),
                      (${relationId}, 'cmi.student_preference.speed', ''),
                      (${relationId}, 'cmi.student_preference.text', ''),
                      (${relationId}, 'cmi.interactions._children', ''),
                      (${relationId}, 'cmi.interactions._count', 0),
                      (${relationId}, 'cmi.interactions.n.id', ''),
                      (${relationId}, 'cmi.interactions.n.objectives._count', ''),
                      (${relationId}, 'cmi.interactions.n.objectives.n.id', ''),
                      (${relationId}, 'cmi.interactions.n.time', '0000:00:00.00'),
                      (${relationId}, 'cmi.interactions.n.type', 'choice'),
                      (${relationId}, 'cmi.interactions.n.correct_responses._count', 0),
                      (${relationId}, 'cmi.interactions.n.correct_responses.n.pattern', ''),
                      (${relationId}, 'cmi.interactions.n.weighting', 0),
                      (${relationId}, 'cmi.interactions.n.student_response', ''),
                      (${relationId}, 'cmi.interactions.n.result', 'neutral'),
                      (${relationId}, 'cmi.interactions.n.latency', '');`;
                    const connection = db.createConnection(dbconfig);
                    connection.query(sql_init, [], (error, results, fields) => {
                        if (error) {
                            console.log('scorm.model.init', error, sql_init);
                            throw new Error('There is an error initializing data models');
                        }
                        console.log(results);
                        resolve(true);
                    });                    
                    connection.end();
                }
            });
        });
    }

    private checkRelationExist(relationId: number = 0){
        return new Promise((resolve, reject) => {
            const sql_check = `SELECT intCourseUserRelationId FROM tblScorm WHERE intCourseUserRelationId = ? LIMIT 1`;
            const connection = db.createConnection(dbconfig);
            connection.query(sql_check, [relationId], (error, results, fields) => {
                if (error) {
                    console.log('scorm.model.checkRelationsExist', error, sql_check);
                    throw new Error('cannot check relation');
                }
                if(!results.length) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
            connection.end();
        });
    }

    public getDataModelVal(relation: number = 0, param: string = ''): Promise<string> {
        return new Promise((resolve, reject) => {
            const sql_get = `SELECT
                                strParameterValue
                            FROM
                                tblScorm
                            WHERE
                                strParameterName = ?
                            AND
                                intCourseUserRelationId = ?
                            LIMIT 1`;
            const connection = db.createConnection(dbconfig);
            connection.query(sql_get, [param, relation], (error, results, fields) => {
                if (error) {
                    console.log('scorm.model.getDataModelVal', error);
                    throw new Error('Cannot get data model value with the given parameter ' + param + ' AND relation ' + relation);
                } 
                resolve(results[0]['strParameterValue']);
            });
            connection.end();
        });
    }
    
    public setDataModelVal(relation: number = 0, paramName: string = '', paramVal: string = null): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const sql_set = `UPDATE
                                tblScorm
                            SET
                                strParameterValue = ?
                            WHERE
                                strParameterName = ?
                            AND
                                intCourseUserRelationId = ?`;
            const connection = db.createConnection(dbconfig);
            connection.query(sql_set, [paramVal, paramName, relation], (error, results, fields) => {
                if (error) {
                    console.log('scorm.model.setDataModelVal', error);
                    throw new Error('Cannot set value with the given parameter ' + paramName + ' AND relation ' + relation);
                }
                resolve(true);
            });
            connection.end();
        });
    }
}


