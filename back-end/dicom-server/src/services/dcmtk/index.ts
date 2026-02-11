import fs from 'fs'
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)

export const dcmj2pnm = async (dicomFilePath: string) => {
  
  try {
    
    const outputFilePath = `${dicomFilePath.split(".dcm")[0]}.jpg`
    const command = `dcmj2pnm +oj ${dicomFilePath} ${outputFilePath}`
  
    if (!fs.existsSync(outputFilePath)) {
      
      const { stderr } = await execPromise(command)
  
      if (stderr) {
        throw Error(stderr)
      }
      
      return outputFilePath
    }

  } catch (error) {
    console.log(`error: ❌️ dcmj2pnm\n`, error)
    return undefined
  }

}
