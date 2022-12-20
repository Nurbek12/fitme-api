import path from 'path'
import multer, { diskStorage } from 'multer'
import {v4 as uuid} from 'uuid'
import url from "url"

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default multer({
    storage: diskStorage({
        destination: (_, __, cb) => {
            cb(null, path.join(dirname, '../', 'files'))
        },
        filename: (_, file, cb) => {
            cb(null, "file-"+uuid()+path.extname(file.originalname));
        }
    })
})