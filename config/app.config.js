const MONGO_DB_CONFIG ={
// DB: This property specifies the connection string for the MongoDB database. The connection string is in the format mongodb://<username>:<password>@<host>:<port>/<database-name>. In this case, the database is located on the local machine (localhost) and is named ecommerce-app-demo. There is no username or password specified, so the database will be accessed anonymously.

    DB: "mongodb://localhost/ecommerce-app-demo",

// PAGE_SIZE: This property specifies the maximum number of documents to return in a single database query. In this case, the page size is set to 10, so each query will return at most 10 documents.

    PAGE_SIZE: 10,
}

// The MONGO_DB_CONFIG object is then exported using the module.exports syntax so that it can be imported and used in other parts of the Node.js application.

module.exports = {
    MONGO_DB_CONFIG,
};