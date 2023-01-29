export default (req, _, next) => {
    const { language } = req.headers;
    Object.assign(req, {lang: language || 'ru' })
    _.json(req.lang)
    next()
}