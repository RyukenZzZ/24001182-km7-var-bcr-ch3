const carService = require("../services/cars");
const { successResponse } = require("../utils/response");

exports.getCars = (req, res, next) => {
    // Call the usecase or service
    const data = carService.getCars(
        req.query?.manufacture,
        req.query?.model
    );

     // Conditional success message based on query parameters
     if (req.query?.manufacture || req.query?.model) {
        // If query parameters are present
        successResponse(res, data, "Below is a list of cars that fit the criteria.");
    } else {
        // If no query parameters are present
        successResponse(res, data, "All cars listed");
    }
    
};

exports.getCarById = (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = carService.getCarById(id);
    successResponse(res, data, "Car found successfully.");
};

exports.createCar = async (req, res, next) => {

    // Create the new Car
    const data = await carService.createCar(req.body, req.files);
    successResponse(res, data, "Car successfully added!");
};


exports.updateCar = async (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = await carService.updateCar(id, req.body, req.files);
    successResponse(res, data, "car successfully changed !");
};

exports.deleteCarById = (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = carService.deleteCarById(id);
    successResponse(res, data, "Car succesfully deleted !");
};