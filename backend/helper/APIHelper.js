class APIHelper
{
    constructor(query, queryStr) {
        this.query =query // MongoDB Query
        this.queryStr = queryStr // Query String From URL 
    }
    search() {
        const keyword = this.queryStr.keyword? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } 
        : {} ;
        this.query = this.query.find({...keyword});
        return this;
    }
    filter() {
        const queryCopy = {...this.queryStr};
        const removeFileds=["keyword","page","limit"];
        removeFileds.forEach((key) => delete queryCopy[key]);
        this.query = this.query.find(queryCopy);
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryCopy.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

export default APIHelper;