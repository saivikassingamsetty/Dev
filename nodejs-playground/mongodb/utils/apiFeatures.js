export default class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const excludeList = ["limit", "sort", "page", "fields"];
    let queryStr = JSON.stringify(this.queryStr);
    queryStr = queryStr.replace(/\b(lt|lte|gte|gt)\b/g, (match) => `$${match}`);
    const queryObj = JSON.parse(queryStr);
    excludeList.forEach((i) => delete queryObj[i]);
    this.query = this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.replace(",", " ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }
    this.query = this.query.select("-__v");

    return this;
  }

  paginate() {
    const page = +this.queryStr.page || 1;
    const limit = +this.queryStr.limit || 10;
    const skip = limit * (page - 1);
    this.query = this.query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const movieCount = await Movie.countDocuments();
    //   if (skip >= movieCount) throw new Error("Page not found!");
    // }

    return this;
  }
}
