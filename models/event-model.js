import {Schema, model} from 'mongoose';

const eventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,  
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

eventSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

const Event= model('Event', eventSchema);
export default Event;