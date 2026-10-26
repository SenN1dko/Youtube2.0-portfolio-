import fs from 'node:fs';
import path from 'node:path';

export function getMaxResolution(fileName:string) {
  const resolutions = ["360p" ,"480p","720p","1080p","2K","4K"]

  let maxRes = '1080p' 

  for(let i = resolutions.length - 1 ; i >= 0 ; i--){
    const currentRes = resolutions[i]
    const filePath = path.join(process.cwd(), 'src' , 'modules', 'file','uploads', 'videos', currentRes, fileName);
    console.log(filePath)
    if(fs.existsSync(filePath)){
      console.log('exist resolution' , currentRes , 'filename' , fileName)
      maxRes = currentRes 
      break;
    }
  }

  return {maxRes}
}