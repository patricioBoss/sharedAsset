import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    investmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Investment',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    message: {
      type: String,
      required: 'message is required',
    },
    type: {
      type: String,
      enum: ['withdrawal', 'approval'],
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

export default Notification;

/**
 * 
var events = require('events');
var eventEmitter = new events.EventEmitter();

//Create an event handler:
var myEventHandler = function () {
  console.log('I hear a scream!');
}

//Assign the event handler to an event:
eventEmitter.on('scream', myEventHandler);

//Fire the 'scream' event:
eventEmitter.emit('scream'); 




const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
  // Prints: a b {}
});
myEmitter.emit('event', 'a', 'b');
 * 
 */

//use the signin callback to check if user is verified or not, if or not
