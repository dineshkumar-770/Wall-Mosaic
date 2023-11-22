const express = require("express");
require('dotenv').config();
const fs = require("fs");
const path = require("path");
const imageInfo = require('image-info');
const sharp = require('sharp');
const { ensureDirectoryExists } = require('./utilities');
const app = express();
const PORT = process.env.PORT || 8000

const commonPath = process.env.COMMON_PATH; 
//abstract images
const abstractImages = path.join(commonPath, "abstract");
const resizedAbstractImages = path.join(abstractImages, 'abstractResized');
//amoled images
const amoledImages = path.join(commonPath,"amoled");
const amoledResizedImages = path.join(amoledImages,"amoledResized");
//apple images
const appleImages = path.join(commonPath,"apple");
const appleResizedImages = path.join(appleImages,"appleResized");


//cars images
const carsImages = path.join(commonPath,"cars");
const carsResizedImages = path.join(carsImages,"carsResized");


//cities images
const citiesImages = path.join(commonPath,"cities");
const citiesResizedImages = path.join(citiesImages,"citiesResized")


//gods images
const godsImages = path.join(commonPath,"gods");
const godsResizedImages = path.join(godsImages,"godsResized");

//marvals images
const marvalsImages = path.join(commonPath,"marvals");
const marvalsResizedImages = path.join(marvalsImages,"marvalsResized");


//nature images
const natureImages = path.join(commonPath,"nature");
const natureResized = path.join(natureImages,"natureResized")


//oneplus images
const oneplusImages = path.join(commonPath,"oneplus");
const oneplusResizedImage = path.join(oneplusImages,"oneplusResized");

//pixels images
const pixelImages = path.join(commonPath,"pixel");
const pixelResizedImages = path.join(pixelImages,"pixelResized");


//samsung images
const samsungImages = path.join(commonPath,"samsung");
const samsungResizedImages = path.join(samsungImages,"samsungResized");


//android images
const androidImages = path.join(commonPath,"android_13");
const androidResized = path.join(androidImages,"androidResized");


//nothing images
const nothingImages = path.join(commonPath,"nothing");
const nothingResizedImages = path.join(nothingImages,"nothingResized");

const resizedAll = path.join(commonPath,"resizedAll");


//all images images
const allImages = path.join(commonPath);
app.use('/wall_mosaic',express.static(abstractImages));
app.use('/wall_mosaic',express.static(amoledImages));
app.use('/wall_mosaic',express.static(appleImages));
app.use('/wall_mosaic',express.static(carsImages));
app.use('/wall_mosaic',express.static(citiesImages));
app.use('/wall_mosaic',express.static(godsImages));
app.use('/wall_mosaic',express.static(marvalsImages));
app.use('/wall_mosaic',express.static(natureImages));
app.use('/wall_mosaic',express.static(oneplusImages));
app.use('/wall_mosaic',express.static(pixelImages));
app.use('/wall_mosaic',express.static(samsungImages));
app.use('/wall_mosaic',express.static(androidImages));
app.use('/wall_mosaic',express.static(allImages));
app.use('/wall_mosaic',express.static(nothingImages));


//Resized static express
app.use('/wall_mosaic',express.static(resizedAbstractImages));
app.use('/wall_mosaic',express.static(amoledResizedImages));
app.use('/wall_mosaic',express.static(appleResizedImages));
app.use('/wall_mosaic',express.static(carsResizedImages));
app.use('/wall_mosaic',express.static(citiesResizedImages));
app.use('/wall_mosaic',express.static(godsResizedImages));
app.use('/wall_mosaic',express.static(marvalsResizedImages));
app.use('/wall_mosaic',express.static(natureResized));
app.use('/wall_mosaic',express.static(oneplusResizedImage));
app.use('/wall_mosaic',express.static(pixelResizedImages));
app.use('/wall_mosaic',express.static(samsungResizedImages));
app.use('/wall_mosaic',express.static(androidResized));
app.use('/wall_mosaic',express.static(nothingResizedImages));


const imagesDirectory = process.env.COMMON_PATH;

//Sync new created files resized directory----
ensureDirectoryExists(resizedAbstractImages)
ensureDirectoryExists(amoledResizedImages)
ensureDirectoryExists(appleResizedImages)
ensureDirectoryExists(carsResizedImages)
ensureDirectoryExists(citiesResizedImages)
ensureDirectoryExists(godsResizedImages)
ensureDirectoryExists(marvalsResizedImages)
ensureDirectoryExists(natureResized)
ensureDirectoryExists(pixelResizedImages)
ensureDirectoryExists(oneplusResizedImage)
ensureDirectoryExists(samsungResizedImages)
ensureDirectoryExists(androidResized)
ensureDirectoryExists(nothingResizedImages) 

const MAIN_DIRECTORY = commonPath;
const IMAGES_DIRECTORY = path.join(MAIN_DIRECTORY);
const RESIZED_DIRECTORY = path.join(IMAGES_DIRECTORY, 'resized');
ensureDirectoryExists(RESIZED_DIRECTORY);


async function resizeImage(imagePath, width, height) {
    try {
        const resizedImagePath = path.join(RESIZED_DIRECTORY, `resized_${path.basename(imagePath)}`);
        await sharp(imagePath)
            .resize({ width, height })
            .toFile(resizedImagePath);
        return resizedImagePath;
    } catch (error) {
        console.error(`Error resizing image ${imagePath}: ${error.message}`);
        return null;
    }
}




app.get('/get_all_images', async (req, res) => {
    try {
        const folderNames = getFolderNames(IMAGES_DIRECTORY);

        const folderData = await Promise.all(folderNames.map(async (folderName) => {
            const folderPath = path.join(IMAGES_DIRECTORY, folderName);
            const imageFiles = getImagesInFolder(folderPath);

            const imageDataPromises = imageFiles.map(async (imageFile) => {
                const imagePath = path.join(folderPath, imageFile);
                const resizedImagePath = await resizeImage(imagePath, 200, 400);
                const resizedImageName = `${imageFile}`;
                

                return {
                    name: resizedImageName,
                    original: `/wall_mosaic/${folderName}/${resizedImageName}`,
                    resized: resizedImagePath
                };
            });

            const imageData = await Promise.all(imageDataPromises);

            return {
                title: folderName,
                numberOfImages: imageFiles.length,
                images: imageData,
            };
        }));

        const response = {
            'status': 200,
            'message': 'All images fetched successfully',
            'categories': folderData,
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            'status': 500,
            'message': 'Internal Server Error',
            'categories': [],
        });
    }
});

 
app.get('/wall_mosaic_abstract', async (req, res) => {
    console.log(req);
    try {
        const imageArray = [];
        fs.readdir(abstractImages, async (err, files) => {
            if (err) {
                res.status(500).json({
                    'error': err.message,
                });
            } else {
                for (const filename of files) {
                    const imagePath = path.join(abstractImages, filename);
                    const resizedImagePath = path.join(resizedAbstractImages, filename);

                    try {
                        await sharp(imagePath)
                            .resize({ width: 200, height: 450 }) 
                            .toFile(resizedImagePath);

                        imageArray.push({
                            'resized': `/wall_mosaic/resized/${filename}`,
                            'name': `${filename.replace(/\.[^.]+$/, '')}`,
                            'original' : `/wall_mosaic/${filename}`
                        });
                    } catch (error) {
                        console.error(`Error processing image ${filename}: ${error.message}`);
                    }
                }

                res.status(200).json({
                    'status': 200,
                    'message': 'abstract wallpapers fetched successfully',
                    'total_images': imageArray.length,
                    'images': imageArray,
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            'status': 500,
            'message': error,
            'total_images': 0,
            'images': [],
        });
    }
});


app.get('/wall_mosaic_nothing',async (req,res)=>{
    try {
        const nothingImageArray = [];  
        fs.readdir(nothingImages,(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                files.map((filename,index)=>{  
                    nothingImageArray.push({
                        "link": `/wall_mosaic/${filename}`,
                        "name":`image_${index}`,  
                    })
                }); 

                res.status(200).json({
                    "status":200, 
                    "message": "nothing wallpapers fetched successfully",
                    "total_images": nothingImageArray.length,
                    "images": nothingImageArray, 
                    
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            "status":500, 
                    "message": error,
                    "total_images": 0,
                    "images": [], 
        });
    }
});

app.get('/wall_mosaic_cities',async(_req,res)=>{
    try {
        const citiesImageArray = [];  
        fs.readdir(citiesImages,async(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                for (const filename of files) {
                    const imagePath = path.join(citiesImages, filename);
                    const resizedImagePath = path.join(citiesResizedImages, filename);

                    try {
                        await sharp(imagePath)
                            .resize({ width: 200, height: 450 }) 
                            .toFile(resizedImagePath);

                            citiesImageArray.push({
                            'resized': `/wall_mosaic/citiesResized/${filename}`,
                            'name': `${filename.replace(/\.[^.]+$/, '')}`,
                            'original' : `/wall_mosaic/${filename}`
                        });
                    } catch (error) {
                        console.error(`Error processing image ${filename}: ${error.message}`);
                    }
                }  

                res.status(200).json({
                    "status":200, 
                    "message": "cities wallpapers fetched successfully",
                    "total_images": citiesImageArray.length,
                    "images": citiesImageArray, 
                    
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            "status":500, 
                    "message": error,
                    "total_images": 0,
                    "images": [], 
        });
    }
}); 

app.get('/wall_mosaic_amoled',async(_req,res)=>{
    try {
        const amoledImageArray = [];  
        fs.readdir(amoledImages,async(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                for (const filename of files) {
                    const imagePath = path.join(amoledImages, filename);
                    const resizedImagePath = path.join(amoledResizedImages, filename);

                    try {
                        await sharp(imagePath)
                            .resize({ width: 200, height: 450 }) 
                            .toFile(resizedImagePath);

                            amoledImageArray.push({
                            'resized': `/wall_mosaic/amoledResized/${filename}`,
                            'name': `${filename.replace(/\.[^.]+$/, '')}`,
                            'original' : `/wall_mosaic/${filename}`
                        });
                    } catch (error) {
                        console.error(`Error processing image ${filename}: ${error.message}`);
                    }
                } 

                res.status(200).json({
                    "status":200, 
                    "message": "amoled wallpapers fetched successfully",
                    "total_images": amoledImageArray.length,
                    "images": amoledImageArray, 
                    
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            "status":500, 
                    "message": error,
                    "total_images": 0,
                    "images": [], 
        });
    }
});
app.get('/wall_mosaic_apple',async(_req,res)=>{
    try {
        const appleImageArray = [];  
        fs.readdir(appleImages,async(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                for (const filename of files) {
                    const imagePath = path.join(appleImages, filename);
                    const resizedImagePath = path.join(appleResizedImages, filename);

                    try {
                        await sharp(imagePath)
                            .resize({ width: 200, height: 450 }) 
                            .toFile(resizedImagePath);

                            appleImageArray.push({
                            'resized': `/wall_mosaic/appleResized/${filename}`,
                            'name': `${filename.replace(/\.[^.]+$/, '')}`,
                            'original' : `/wall_mosaic/${filename}`
                        });
                    } catch (error) {
                        console.error(`Error processing image ${filename}: ${error.message}`);
                    }
                }  

                res.status(200).json({
                    "status":200, 
                    "message": "apple wallpapers fetched successfully",
                    "total_images": appleImageArray.length,
                    "images": appleImageArray, 
                    
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            "status":500, 
                    "message": error,
                    "total_images": 0,
                    "images": [], 
        });
    }
});
app.get('/wall_mosaic_cars',async(_req,res)=>{
    try {
        const carsImageArray = [];  
        fs.readdir(carsImages,async(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                for (const filename of files) {
                    const imagePath = path.join(carsImages, filename);
                    const resizedImagePath = path.join(carsResizedImages, filename);

                    try {
                        await sharp(imagePath)
                            .resize({ width: 200, height: 450 }) 
                            .toFile(resizedImagePath);

                            carsImageArray.push({
                            'resized': `/wall_mosaic/carsResized/${filename}`,
                            'name': `${filename.replace(/\.[^.]+$/, '')}`,
                            'original' : `/wall_mosaic/${filename}`
                        });
                    } catch (error) {
                        console.error(`Error processing image ${filename}: ${error.message}`);
                    }
                }   

                res.status(200).json({
                    "status":200, 
                    "message": "cars wallpapers fetched successfully",
                    "total_images": carsImageArray.length,
                    "images": carsImageArray, 
                    
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            "status":500, 
                    "message": error,
                    "total_images": 0,
                    "images": [], 
        });
    }
});

app.get('/wall_mosaic_gods',async(_req,res)=>{
    try {
        const godsImageArray = [];  
        fs.readdir(godsImages,async(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                for (const filename of files) {
                    const imagePath = path.join(godsImages, filename);
                    const resizedImagePath = path.join(godsResizedImages, filename);

                    try {
                        await sharp(imagePath)
                            .resize({ width: 200, height: 450 }) 
                            .toFile(resizedImagePath);

                            godsImageArray.push({
                            'resized': `/wall_mosaic/godsResized/${filename}`,
                            'name': `${filename.replace(/\.[^.]+$/, '')}`,
                            'original' : `/wall_mosaic/${filename}`
                        });
                    } catch (error) {
                        console.error(`Error processing image ${filename}: ${error.message}`);
                    }
                }  

                res.status(200).json({
                    "status":200, 
                    "message": "gods wallpapers fetched successfully",
                    "total_images": godsImageArray.length,
                    "images": godsImageArray, 
                    
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            "status":500, 
                    "message": error,
                    "total_images": 0,
                    "images": [], 
        });
    }
});

app.get('/wall_mosaic_marvals',async(_req,res)=>{
    try {
        const marvalsImageArray = [];  
        fs.readdir(marvalsImages,async(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                for (const filename of files) {
                    const imagePath = path.join(marvalsImages, filename);
                    const resizedImagePath = path.join(marvalsResizedImages, filename);

                    try {
                        await sharp(imagePath)
                            .resize({ width: 200, height: 450 }) 
                            .toFile(resizedImagePath);

                            marvalsImageArray.push({
                            'resized': `/wall_mosaic/marvalsResized/${filename}`,
                            'name': `${filename.replace(/\.[^.]+$/, '')}`,
                            'original' : `/wall_mosaic/${filename}`
                        });
                    } catch (error) {
                        console.error(`Error processing image ${filename}: ${error.message}`);
                    }
                }  

                res.status(200).json({
                    "status":200, 
                    "message": "marvals wallpapers fetched successfully",
                    "total_images": marvalsImageArray.length,
                    "images": marvalsImageArray, 
                    
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            "status":500, 
                    "message": error,
                    "total_images": 0,
                    "images": [], 
        });
    }
});

app.get('/wall_mosaic_nature',async(_req,res)=>{
    try {
        const natureImageArray = [];  
        fs.readdir(natureImages,async(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                for (const filename of files) {
                    const imagePath = path.join(natureImages, filename);
                    const resizedImagePath = path.join(natureResized, filename);

                    try {
                        await sharp(imagePath)
                            .resize({ width: 200, height: 450 }) 
                            .toFile(resizedImagePath);

                            natureImageArray.push({
                            'resized': `/wall_mosaic/natureResized/${filename}`,
                            'name': `${filename.replace(/\.[^.]+$/, '')}`,
                            'original' : `/wall_mosaic/${filename}`
                        });
                    } catch (error) {
                        console.error(`Error processing image ${filename}: ${error.message}`);
                    }
                }  

                res.status(200).json({
                    "status":200, 
                    "message": "nature wallpapers fetched successfully",
                    "total_images": natureImageArray.length,
                    "images": natureImageArray, 
                    
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            "status":500, 
                    "message": error,
                    "total_images": 0,
                    "images": [], 
        });
    }
});

app.get('/wall_mosaic_oneplus',async(req,res)=>{
    try {
        const oneplusImageArray = [];  
        fs.readdir(oneplusImages,async(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                for (const filename of files) {
                    const imagePath = path.join(oneplusImages, filename);
                    const resizedImagePath = path.join(oneplusResizedImage, filename);

                    try {
                        await sharp(imagePath)
                            .resize({ width: 200, height: 450 }) 
                            .toFile(resizedImagePath);

                            oneplusImageArray.push({
                            'resized': `/wall_mosaic/oneplusResized/${filename}`,
                            'name': `${filename.replace(/\.[^.]+$/, '')}`,
                            'original' : `/wall_mosaic/${filename}`
                        });
                    } catch (error) {
                        console.error(`Error processing image ${filename}: ${error.message}`);
                    }
                } 

                res.status(200).json({
                    "status":200, 
                    "message": "oneplus wallpapers fetched successfully",
                    "total_images": oneplusImageArray.length,
                    "images": oneplusImageArray, 
                    
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            "status":500, 
                    "message": error,
                    "total_images": 0,
                    "images": [], 
        });
    }
});


app.get('/wall_mosaic_pixel',async(req,res)=>{
    try {
        const pixelImageArray = [];  
        fs.readdir(pixelImages,async(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                for (const filename of files) {
                    const imagePath = path.join(pixelImages, filename);
                    const resizedImagePath = path.join(pixelResizedImages, filename);

                    try {
                        await sharp(imagePath)
                            .resize({ width: 200, height: 450 }) 
                            .toFile(resizedImagePath);

                            pixelImageArray.push({
                            'resized': `/wall_mosaic/pixelResized/${filename}`,
                            'name': `${filename.replace(/\.[^.]+$/, '')}`,
                            'original' : `/wall_mosaic/${filename}`
                        });
                    } catch (error) {
                        console.error(`Error processing image ${filename}: ${error.message}`);
                    }
                } 

                res.status(200).json({
                    "status":200, 
                    "message": "pixels wallpapers fetched successfully",
                    "total_images": pixelImageArray.length,
                    "images": pixelImageArray, 
                    
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            "status":500, 
                    "message": error,
                    "total_images": 0,
                    "images": [], 
        });
    }
});

app.get('/wall_mosaic_samsung',async(req,res)=>{
    try {
        const samsungImageArray = [];  
        fs.readdir(samsungImages,async(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                for (const filename of files) {
                    const imagePath = path.join(samsungImages, filename);
                    const resizedImagePath = path.join(samsungResizedImages, filename);

                    try {
                        await sharp(imagePath)
                            .resize({ width: 200, height: 450 }) 
                            .toFile(resizedImagePath);

                            samsungImageArray.push({
                            'resized': `/wall_mosaic/samsungResized/${filename}`,
                            'name': `${filename.replace(/\.[^.]+$/, '')}`,
                            'original' : `/wall_mosaic/${filename}`
                        });
                    } catch (error) {
                        console.error(`Error processing image ${filename}: ${error.message}`);
                    }
                }  

                res.status(200).json({
                    "status":200, 
                    "message": "samsung wallpapers fetched successfully",
                    "total_images": samsungImageArray.length,
                    "images": samsungImageArray, 
                    
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            "status":500, 
                    "message": error,
                    "total_images": 0,
                    "images": [], 
        });
    }
});


app.get('/wall_mosaic_android_13',async(req,res)=>{
    try {
        const androidImageArray = [];  
        fs.readdir(androidImages,async(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                
                for (const filename of files) {
                    const imagePath = path.join(androidImages, filename);
                    const resizedImagePath = path.join(androidResized, filename);

                    try {
                        await sharp(imagePath)
                            .resize({ width: 200, height: 450 }) 
                            .toFile(resizedImagePath);

                            androidImageArray.push({
                            'resized': `/wall_mosaic/androidResized/${filename}`,
                            'name': `${filename.replace(/\.[^.]+$/, '')}`,
                            'original' : `/wall_mosaic/${filename}`
                        });
                    } catch (error) {
                        console.error(`Error processing image ${filename}: ${error.message}`);
                    }
                }  

                res.status(200).json({
                    "status":200, 
                    "message": "android wallpapers fetched successfully",
                    "total_images": androidImageArray.length,
                    "images": androidImageArray, 
                    
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            "status":500, 
                    "message": error,
                    "total_images": 0,
                    "images": [], 
        });
    }
});



app.get("/image-info",async (_req, res) => {
    try {
        const folderNames = getFolderNames(imagesDirectory); 

    

    const folderData = folderNames.map((folderName,_index) => {
        const folderPath = path.join(imagesDirectory, folderName);
        const imageFiles = getImagesInFolder(folderPath);
        const firstImagePath = imageFiles.length > 0 ? `/wall_mosaic/${imageFiles[0]}` : null;
         const key = `wall_mosaic_${folderName}`

        return {
            folderName,
            numberOfImages: imageFiles.length,
            firstImagePath, 
             key
        };
    });

    const response = {
        "catagories": folderData
    };

    res.json(response);
    } catch (error) {
        res.json({
            "catagories": []
        })
    }
});

function getFolderNames(directory) {
    return fs.readdirSync(directory)
        .filter((file) => fs.statSync(path.join(directory, file)).isDirectory());
}

function getImagesInFolder(folderPath) {
    return fs.readdirSync(folderPath)
        .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));
}


function imagesInformation(filename) {
    try {
        imageInfo(filename, (err, info) => {
            if (err){ return console.warn(err);}else{
                return info;
            }
                        
        });
    } catch (error) {
        console.log('Error: ' + error.message);
        return error
    }
} 

async function resizeImage(imagePath, width, height) {
    try {
        const resizedImagePath = path.join(imagesDirectory, 'resized', path.basename(imagePath));
        await sharp(imagePath)
            .resize({ width, height })
            .toFile(resizedImagePath);
        return `/wall_mosaic/resized/${path.basename(imagePath)}`;
    } catch (error) {
        console.error(`Error resizing image ${imagePath}: ${error.message}`);
        return null;
    }
}

app.listen(PORT,()=>{
    console.log(`Server start at PORT: ${PORT} ${commonPath}`)  
}) 