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
    filter() {}
    pagination() {}
}

export default APIHelper;
