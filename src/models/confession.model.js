const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const confessionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    read_time: {
      type: Number,
      default: false,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    deleted_at:{
      type: Date,
      required: false,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
confessionSchema.plugin(toJSON);
confessionSchema.plugin(paginate);

const Confession = mongoose.model('Confession', confessionSchema);

module.exports = Confession;
