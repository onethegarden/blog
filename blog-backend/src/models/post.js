import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
    title: String,
    body: String,
    tags:[String], //문자열로 이루어진 배열
    publishedDate:{
        type: Date,
        default: Date.now, //현재 날짜를 기본으로
    },
    user:{//mongoDB에서는 필요한 데이터를 전부 집어 넣음
        _id: mongoose.Types.ObjectId,
        username: String,
    },
})

const Post = mongoose.model('Post', PostSchema); //모델 인스턴스 만들기
export default Post;
