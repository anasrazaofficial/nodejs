class QueryParamExtract {
    constructor(mongoModel, query) {
        this.mongoModel = mongoModel;
        this.query = query;
    }

    search() {
        const searchKeyword = this.query.search ? {
            name: {
                $regex: this.query.search,
                $options: "i"
            }
        } : {}
        this.mongoModel = this.mongoModel.find({ ...searchKeyword })

        return this
    }

    paginate(pageNo) {
        let currentPage = 1

        if (this.query.page) {
            currentPage = this.query.page
        }

        this.mongoModel = this.mongoModel.limit(pageNo * 5).skip(pageNo * (currentPage - 1))
        return this
    }

    filter() {
        const queryCopy = { ...this.query }

        delete queryCopy["search"]
        delete queryCopy["limit"]
        delete queryCopy["page"]

        let queryString = JSON.stringify(queryCopy).replace(/\b(gte|lte|gt|lt)\b/g, m => `$${m}`)

        const queryObj = JSON.parse(queryString)
        this.mongoModel = this.mongoModel.find(queryObj)
        return this
    }
}

module.exports = QueryParamExtract