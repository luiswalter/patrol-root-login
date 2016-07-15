var lcfn = require("lambda-cfn");
var message = lcfn.message;

module.exports = {};

module.exports.fn = function(event, callback) {
var notification = {
      subject: 'Root user logged in to the console.',
      summary: 'Patrol detected that the root AWS user logged ed in to the console',
      event: event
    };
    if(event.detail.userIdentity.userName == "root"){
      message(notification, function(err, result) {
        callback(err, result);
      });
	}else{
		callback(null,"not root user")
	}
};

module.exports.config = {
	name: "rootLogin",
	eventRule: {
    eventPattern: {
      'detail-type': [
        'AWS API Call via CloudTrail'
      ],
      detail: {
        eventSource: [
          'sts.amazonaws.com'
        ],
        eventName: [
          'AssumeRole'
        ]
      }
    }
  }

};