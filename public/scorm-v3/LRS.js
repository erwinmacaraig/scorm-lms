var user = 0;
var course = 0;
var user_course_relation = 0;
var course_relation = [];

var LRS = {};

LRS.initialize = function(userId,courseId) {
    var result = {};
	$.ajax({
        type: "POST",
        url: "http://localhost:3000/initializeLRS/",
        data: {
           "userId": userId,
           "courseId": courseId
        },
        success: (data) => {
            console.log("returned data = ", data);
            result = data;
        },
        error: (e) =>{
            console.log('Error', e);
        },
        dataType: 'json',
        async: false
    });
    return result;
};
