const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        writtenBy: {
            type: String,
            required: 'You need to provide a name!',
            trim: true
        },
        replyBody: {
            type: String,
            required: 'You need to provide a comment!',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema({
    writtenBy: {
        type: String,
        required: 'You need to provide a name!',
        trim: true
    },
    commentBody: {
        type: String,
        required: 'You need to provide a comment!',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

CommentSchema.virtual('replyCount').get(function () {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;