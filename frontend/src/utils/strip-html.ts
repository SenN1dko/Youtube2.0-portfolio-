export function stripToHtml(html:string) {
    return html.replace(/<\/?[^>]+(>|$)/g , '')
}