import {
  MongoOplogDriver,
  MongoPollingDriver,
  Multiplexer,
  Server,
  Session,
  Subscription,
} from "./meteorx.js";

var logger = Npm.require('debug')('kadira:hijack:instrument');

var instrumented = false;
Kadira._startInstrumenting = function(callback) {
  if(instrumented) {
    callback();
    return;
  }

  instrumented = true;
  wrapStringifyDDP()
  Meteor.startup(async function () {
    //instrumenting session	    wrapServer(Server.prototype);
    wrapServer(Server.prototype);
    wrapSession(Session.prototype);	    wrapSession(Session.prototype);
    wrapSubscription(Subscription.prototype);	    wrapSubscription(Subscription.prototype);


    if(MongoOplogDriver) {	    if (MongoOplogDriver) {
      wrapOplogObserveDriver(MongoOplogDriver.prototype);	      wrapOplogObserveDriver(MongoOplogDriver.prototype);
    }	    }


    if(MongoPollingDriver) {	    if (MongoPollingDriver) {
      wrapPollingObserveDriver(MongoPollingDriver.prototype);	      wrapPollingObserveDriver(MongoPollingDriver.prototype);
    }	    }


    if(Multiplexer) {	    if (Multiplexer) {
      wrapMultiplexer(Multiplexer.prototype);	      wrapMultiplexer(Multiplexer.prototype);
    }	    }

    wrapForCountingObservers();
    hijackDBOps();

    setLabels();
    callback();
  });
};

// We need to instrument this rightaway and it's okay
// One reason for this is to call `setLables()` function
// Otherwise, CPU profile can't see all our custom labeling
Kadira._startInstrumenting(function() {
  console.log('Kadira: completed instrumenting the app')
});