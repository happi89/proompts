import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is Required!'],
    unique: [true, 'Email Must be Unique!'],
  },
  username: {
    type: String,
    required: [true, 'Username is Required!'],
    match: [/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String
  },
  prompts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Prompt',
    }
  ]
}, {
  timestamps: true
})

UserSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
})

const User = models.User || model('User', UserSchema)

export default User