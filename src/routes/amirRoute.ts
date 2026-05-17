// import { Cookie } from "bun";
// import {Elysia , t} from "elysia";

// export const amir = new Elysia({prefix:'user', cookie:{
//     secrets:'asdasdsa'
// }})
// // .get('amir/*', ({params}) => params['*'])
// // .get('img', file('src/public/image.png'))
// // .get('context/:a' , (c) => c.params )
// // .get('status' , (c) => c.status(599))
// // .get('path' , ({path}) =>path)
// // .get('set' , ({set , headers}) => {
// // set.headers['host'] = 'amir'
// // return headers
// // }
// // )
// .get('/name', ({ cookie: { name } }) => {
//     name.value = 'amir' 
    
//     return `Cookie set to: ${name.value}`
// }, {
//     cookie: t.Cookie({
//         name: t.Optional(t.String())
//     }, {
//         secrets: 'asdasdsa',
//         sign: ['name']
//     })
// })
// .get('/visit' , ({cookie:{visit}}) => {
// visit.value ??= 0
// visit.value += 1
// return `You have visited ${visit.value} times`
// },
// {
//     cookie: t.Cookie({
//         visit: t.Optional(t.Number())
//     },
// {
//     secrets:'asdasdsa',
//     sign:['visit']
// })
// })
// .get('/clear', ({cookie:{visit}}) => {
// visit.remove()
// return "cookie has cleared"
// })