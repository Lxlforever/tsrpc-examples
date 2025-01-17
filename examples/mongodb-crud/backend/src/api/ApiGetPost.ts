import { ObjectID } from 'mongodb';
import { ApiCall } from "tsrpc";
import { Global } from "../models/Global";
import { ReqGetPost, ResGetPost } from "../shared/protocols/PtlGetPost";

export async function ApiGetPost(call: ApiCall<ReqGetPost, ResGetPost>) {
    let op = await Global.collection('Post').findOne({
        _id: new ObjectID(call.req._id)
    });

    if (!op) {
        call.error('Post 不存在');
        return;
    }

    call.succ({
        post: {
            ...op,
            _id: op._id.toHexString()
        }
    })
}