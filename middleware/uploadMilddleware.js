import path from 'path'
import multer, { diskStorage } from 'multer'
import url from "url"

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
export default multer({
    storage: diskStorage({
        destination: (_,__,cb) => {
            cb(null, path.join(dirname, '../', 'images'))
        },
        filename: (req, file, cb) => {
            cb(null, req.body.filename)
        }
    })
})
