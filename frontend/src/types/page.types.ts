export interface IPageProps<T> {
    params: Promise<T>
}

export type TPageSlugProp = {
  params: Promise<{ slug: string }> 
}
export type TPageIdProp = IPageProps<{id:string}> 
export type TPagePublicIdProp = IPageProps<{publicId:string}> 
export type TPageTokenProp = IPageProps<{token:string}> 
