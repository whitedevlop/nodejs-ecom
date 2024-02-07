const {category} = require("../models/category.model");

//to create a category function
async function createCategory(params, callback){
    // check if category name is not provided
    if(!params.categoryName){
        return callback({
            message:"Category Name required",
        },
        ""
        );
    }
// saving the category using "cateogory" object from model
const model = new category(params);
model.save().then((response)=>{
    return callback(null, response);
}).catch((error)=>{
    return callback(error);
});
}

//to get a categories
async function getCategories(params, callback){
    const categoryName = params.categoryName;
    var condition = categoryName ? {
        categoryName: {$regex: new RegExp(categoryName), $options: "i"}
    }: {}
    // pagination
    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.pageSize;
    let page = (Math.abs(params.page) || 1) -1;

    // second parameter is for fetching 
    category.find(condition, "categoryName categoryImage")
    // it shows how much data should be shown in one page
    .limit(perPage)
    // it will skip those data which is already shown. i.e. if first 10 data is shown in 1 page then in next page pervious data will be skipped
    .skip(perPage*page)
    .then((response)=>{
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    })

};

//to get a category by id
async function getCategoryById(params, callback){
    const categoryId = params.categoryId;

        // second parameter is for fetching 
    category.findById(categoryId)
       .then((response)=>{
        if(!response) callback("Not found category with ID" + categoryId);
        else callback(null, response);
    }).catch((error)=>{
        return callback(error);
    })

};

//to get a updatecategory
async function getCategoryById(params, callback){
    const categoryId = params.categoryId;

        // second parameter is for fetching 
    category.findByIdAndUpdate(categoryId,params, {useFindAndModify: false})
       .then((response)=>{
        if(!response) callback("Not found category with ID" + categoryId);
        else callback(null, response);
    }).catch((error)=>{
        return callback(error);
    })

};

//to get a deletecategory
async function deletecategory(params, callback){
    const categoryId = params.categoryId;

        // second parameter is for fetching 
    category.findByIdAndDelete(categoryId)
       .then((response)=>{
        if(!response) callback("Not found category with ID" + categoryId);
        else callback(null, response);
    }).catch((error)=>{
        return callback(error);
    })

};