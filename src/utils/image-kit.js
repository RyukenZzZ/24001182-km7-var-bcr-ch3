const ImageKit = require ("imagekit");

const imagekit = new ImageKit ({
    publicKey : "public_kMRHPaQzwDcEPQkcMPkCvkCOAY0=",
    privateKey : "private_AEKNzKP30Yx+O1weMdP2DUWFx1s=",
    urlEndpoint: "https://ik.imagekit.io/ddyxw1f62/",
});

// Image upload function to imagekit
exports.imageUpload = async (file) => {
    const uploadedFile = await imagekit.upload({
        file: file.data,
        fileName: file.name,
    });
    return uploadedFile?.url;
};