import {Elysia , t} from "elysia";

export const auth = new Elysia({prefix:'/auth'})
.post('/login' , async({body , headers}) =>{

} , {
    headers:t.Object({
        recaptcha: t.String(),
        body:t.Object({
            email:t.String(),
            password:t.String()
        })
    })
})