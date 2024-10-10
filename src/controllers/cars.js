const carService = require("../services/cars");
const { successResponse } = require("../utils/response");

exports.getCars = (req, res, next) => {
    // Call the usecase or service
    const data = carService.getCars(
        req.query?.manufacture,
        req.query?.model
    );
    successResponse(res, data,"Below, cars with the following criteria");
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


exports.updateCar = (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = carService.updateCar(id, req.body);
    successResponse(res, data, "car successfully changed !");
};

exports.deleteCarById = (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = carService.deleteCarById(id);
    successResponse(res, data, "Car succesfully deleted !");
};