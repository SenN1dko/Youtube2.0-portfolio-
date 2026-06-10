export interface IPageProps<T> {
    params: T
}

export type TPageSlugProp = {
  params: Promise<{ slug: string }> 
}
export type TPageIdProp = IPageProps<{id:string}> 