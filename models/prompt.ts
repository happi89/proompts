import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: [true, 'Prompt is Required'],
    unique: true
  },
  tag: {
    type: String,
    required: [true, 'Tag is Required']
  },
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
}, {
  timestamps: true // Add the timestamps option
})

PromptSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt
