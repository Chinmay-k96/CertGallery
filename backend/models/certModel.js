import mongoose from 'mongoose';

const certSchema = mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      unique: true,
    }
  },
  {
    timestamps: true,
  }
);

const Certificate = mongoose.model('certificates', certSchema);

//module.exports = User;
export default Certificate;
