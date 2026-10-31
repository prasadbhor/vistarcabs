import { Schema, model, models } from 'mongoose';

/** Corporate enquiries and contact-page messages. */
const leadSchema = new Schema(
  {
    kind: { type: String, enum: ['corporate', 'contact'], required: true, index: true },
    data: { type: Schema.Types.Mixed, required: true },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  },
  { timestamps: true },
);

export default models.Lead || model('Lead', leadSchema);
