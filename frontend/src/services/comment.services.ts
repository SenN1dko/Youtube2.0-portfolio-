
import type { IComment, ICommentData } from '@/types/comment.type'
import {  instance } from '@/api/axios'

class CommentService {
    private _COMMENTS = '/comment'


async byVideo(publicId: string): Promise<IComment[]> {
    const response = await instance.get<{ comments: IComment[] }>(`${this._COMMENTS}/by-video/${publicId}`);
    return response.data.comments; 
}
    update(id:string , data:ICommentData){
        return instance.put<boolean>(`${this._COMMENTS}/${id} ` , data)
    }
      create( data:ICommentData){
        return instance.post<IComment>(`${this._COMMENTS}` , data)
    }
    delete( id:string){
        return instance.delete<boolean>(`${this._COMMENTS}/${id}` , )
    }

}

export const commentService = new CommentService()
