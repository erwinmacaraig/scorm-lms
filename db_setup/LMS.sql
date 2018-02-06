CREATE TABLE `tblScorm` (
  `intScormId` int(11) NOT NULL AUTO_INCREMENT,
  `intCourseUserRelationId` INT,  
  `strParameterName` varchar(255) DEFAULT NULL,
  `strParameterValue` text DEFAULT NULL,  
  PRIMARY KEY (`intScormId`),
  UNIQUE KEY `course_lecture` (`intCourseUserRelationId`, `strParameterName`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE tblScormCourse (
    `intCourseId` INT(11) NOT NULL AUTO_INCREMENT,
    `strCourseName` VARCHAR(255),
    `strCourseLauncher` VARCHAR(255), # this is read from the manifest file
    CONSTRAINT PRIMARY KEY (intCourseId)
)engine=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE tblCourseUserRelation(
     `intCourseUserRelationId` INT auto_increment,
     `intUserId` INT,
     `intCourseId` INT,
     `dtTimeStamp` datetime DEFAULT current_timestamp,
     CONSTRAINT PRIMARY KEY (intCourseUserRelationId),
     UNIQUE `user_course` (`intCourseId`, `intUserId`)
)engine=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

INSERT INTO tblScormCourse VALUES 
(1, 'Employee Health and Wellness (Sample Course)', 'health/scormdriver/indexAPI.html'),
(2, 'Golf Explained - Run-time Basic Calls', 'golf/shared/launchpage.html');

INSERT INTO tblCourseUserRelation VALUES 
 (1, 1, 1, NOW()),
 (2, 1, 2, NOW()),
 (3, 2, 1, NOW()),
 (4, 2, 2, NOW()),
 (5, 3, 1, NOW()),
 (6, 3, 2, NOW());