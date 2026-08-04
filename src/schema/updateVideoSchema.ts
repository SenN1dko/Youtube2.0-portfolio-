import { t } from 'elysia'

export const updateVideoSchema = {
    params: t.Object({
        id: t.String()
    }),
    body: t.Partial(
        t.Object({
            title: t.Optional(t.String({ minLength: 1 })),
            tags: t.Array(t.String()),
            maxResolution: t.Optional(t.String()),
            description: t.Optional(t.String()),
            thumbnailUrl: t.Optional(t.String()),
            videoFileName: t.Optional(t.String()),
        })
    )
}

  
// Тип для аргументов сервиса
export type UpdateVideoDto = typeof updateVideoSchema.body.static