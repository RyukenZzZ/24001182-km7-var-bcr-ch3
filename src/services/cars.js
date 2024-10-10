const carRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCars = (manufacture, model) => {
    const students = carRepository.getCars(manufacture,model);
    if (students == ""){
        throw new NotFoundError("Cars with the following criteria were not found!");
    }
    return students;
};

exports.getCarById = (id) => {
    const car = carRepository.getCarById(id);
    if (!car) {
        throw new NotFoundError("Car is Not Found!");
    }

    return car;
};

exports.createCar = async (data, file) => {
    // Upload file to image kit
    if (file?.image) {
        data.image = await imageUpload(file.image);
    }

    // Create the data
    return carRepository.createCar(data);
};

exports.updateCar = (id, data) => {
    // find Car is exist or not (validate the data)
    const existingCar = carRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    // if exist, we will delete the Car data
    const updatedCar = carRepository.updateCar(id, data);
    if (!updatedCar) {
        throw new InternalServerError(["Failed to update Car!"]);
    }

    return updatedCar;
};

exports.deleteCarById = (id) => {
    // find Car is exist or not (validate the data)
    const existingCar = carRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    // if exist, we will delete the Car data
    const deletedCar = carRepository.deleteCarById(id);
    if (!deletedCar) {
        throw new InternalServerError(["Failed to delete Car!"]);
    }

    return deletedCar;
};