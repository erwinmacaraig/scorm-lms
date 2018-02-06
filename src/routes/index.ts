import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { Scorm } from '../models/scorm.model';
import { CourseUserRelation } from '../models/course-user-relation.model';
import { Course } from '../models/course.model';

/**
 * / route
 *
 * @class User
 */
export class IndexRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[IndexRoute::create] Creating index route.");

    //add home page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    });

    router.post("/initializeLRS/", (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().initializeLRS(req, res, next).then((data) => {
        return res.status(200).send(data);
      }).catch((e) => {
        return res.status(400).send({'status': false});
      });
    });

    router.get('/getParameter/', (req: Request, res: Response, next:  NextFunction) => {
      /*
      new IndexRoute().getScormData(req, res, next).then((data) => {
        
      }).catch((e) => {

      });
      */
      const scorm = new Scorm();
      scorm.getDataModelVal(req.query.relation, req.query.param).then((data) => {
        console.log(data);
        return res.status(200).send({
          'value': data
        });
      }).catch((e) => {
        return res.status(400).send({
          'status': false
        });
      });
    });

    router.post('/setParameterValue/', (req: Request, res: Response, next: NextFunction) => {
      const scorm = new Scorm();
      scorm.setDataModelVal(req.body.relation,req.body.param,req.body.value).then((data) => {
        return res.status(200).send({
          'status': true
        })
      }).catch((e) => {
        return res.status(400).send({
          'status': false
        })
      });

    });
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Home | Tour of Heros";

    //set options
    let options: Object = {
      "message": "Welcome to the Tour of Heros"
    };

    //render template
    this.render(req, res, "index", options);
  }

  public async initializeLRS(req, res, next) {
    const course = new Course(req.body.courseId);
    const courseData = await course.load(); 
    const courseUserRelation = new CourseUserRelation(); 
    let relation = 0;     
    const scorm = new Scorm();
    try {
      relation = await courseUserRelation.getRelation(req.body.userId, req.body.courseId);
      courseData['intCourseUserRelationId'] = relation;
      console.log('relation = ' + relation);      
    } catch (e) {
      console.log(e);      
    } 
    await scorm.init(relation);    
    return courseData;
  }

  public async getScormData(req: Request, res: Response, next: NextFunction) {

  }
}