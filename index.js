const express = require("express");
require('dotenv').config();
const fs = require("fs");
const path = require("path");
const imageInfo = require('image-info');
const app = express();
const PORT = process.env.PORT || 8000

const commonPath = process.env.COMMON_PATH; 
const abstractImages = path.join(commonPath, "abstract");
const amoledImages = path.join(commonPath,"amoled");
const appleImages = path.join(commonPath,"apple");
const carsImages = path.join(commonPath,"cars");
const citiesImages = path.join(commonPath,"cities");
const godsImages = path.join(commonPath,"gods");
const marvalsImages = path.join(commonPath,"marvals");
const natureImages = path.join(commonPath,"nature");
const oneplusImages = path.join(commonPath,"oneplus");
const pixelImages = path.join(commonPath,"pixel");
const samsungImages = path.join(commonPath,"samsung");
const androidImages = path.join(commonPath,"android_13");
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

const imagesDirectory = process.env.COMMON_PATH;



app.get('/wall_mosaic_abstract',async(req,res)=>{ 
    console.log(req);
    try {
        const imageArray = []; 
        var imgInfo;
        fs.readdir(abstractImages,(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                files.map((filename,_index)=>{ 
                    imgInfo = imagesInformation(`G:/Node projects/wallpaper_server/images/abstract/${filename}`)
                    imageArray.push({
                        "link": `/wall_mosaic/${filename}`,
                        "name":`${filename.replace(/\.[^.]+$/, "")}`, 
                        "imgInfo": imgInfo
                    })
                }); 

                res.status(200).json({
                    "status":200, 
                    "message": "abstract wallpapers fetched successfully",
                    "total_images": imageArray.length,
                    "images": imageArray, 
                    
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
        fs.readdir(citiesImages,(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                files.map((filename,index)=>{  
                    citiesImageArray.push({
                        "link": `/wall_mosaic/${filename}`,
                        "name":`image_${index}`,  
                    })
                }); 

                res.status(200).json({
                    "status":200, 
                    "message": "abstract wallpapers fetched successfully",
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
        fs.readdir(amoledImages,(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                files.map((filename,index)=>{  
                    amoledImageArray.push({
                        "link": `/wall_mosaic/${filename}`,
                        "name":`image_${index}`,  
                    })
                }); 

                res.status(200).json({
                    "status":200, 
                    "message": "abstract wallpapers fetched successfully",
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
        fs.readdir(appleImages,(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                files.map((filename,index)=>{  
                    appleImageArray.push({
                        "link": `/wall_mosaic/${filename}`,
                        "name":`image_${index}`,  
                    })
                }); 

                res.status(200).json({
                    "status":200, 
                    "message": "abstract wallpapers fetched successfully",
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
        fs.readdir(carsImages,(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                files.map((filename,index)=>{  
                    carsImageArray.push({
                        "link": `/wall_mosaic/${filename}`,
                        "name":`image_${index}`,  
                    })
                }); 

                res.status(200).json({
                    "status":200, 
                    "message": "abstract wallpapers fetched successfully",
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
        fs.readdir(godsImages,(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                files.map((filename,index)=>{  
                    godsImageArray.push({
                        "link": `/wall_mosaic/${filename}`,
                        "name":`image_${index}`,  
                    })
                }); 

                res.status(200).json({
                    "status":200, 
                    "message": "abstract wallpapers fetched successfully",
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
        fs.readdir(marvalsImages,(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                files.map((filename,index)=>{  
                    marvalsImageArray.push({
                        "link": `/wall_mosaic/${filename}`,
                        "name":`image_${index}`,  
                    })
                }); 

                res.status(200).json({
                    "status":200, 
                    "message": "abstract wallpapers fetched successfully",
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
        fs.readdir(natureImages,(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                files.map((filename,index)=>{  
                    natureImageArray.push({
                        "link": `/wall_mosaic/${filename}`,
                        "name":`image_${index}`,  
                    })
                }); 

                res.status(200).json({
                    "status":200, 
                    "message": "abstract wallpapers fetched successfully",
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
        fs.readdir(oneplusImages,(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                files.map((filename,index)=>{  
                    oneplusImageArray.push({
                        "link": `/wall_mosaic/${filename}`,
                        "name":`image_${index}`,  
                    })
                }); 

                res.status(200).json({
                    "status":200, 
                    "message": "abstract wallpapers fetched successfully",
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
        fs.readdir(pixelImages,(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                files.map((filename,index)=>{  
                    pixelImageArray.push({
                        "link": `/wall_mosaic/${filename}`,
                        "name":`image_${index}`,  
                    })
                }); 

                res.status(200).json({
                    "status":200, 
                    "message": "abstract wallpapers fetched successfully",
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
        fs.readdir(samsungImages,(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                files.map((filename,index)=>{  
                    samsungImageArray.push({
                        "link": `/wall_mosaic/${filename}`,
                        "name":`image_${index}`,  
                    })
                }); 

                res.status(200).json({
                    "status":200, 
                    "message": "abstract wallpapers fetched successfully",
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
        fs.readdir(androidImages,(err,files)=>{
            if(err){
                res.status(500).json({
                    "error":err.message
                });
            }else{
                files.map((filename,index)=>{  
                    androidImageArray.push({
                        "link": `/wall_mosaic/${filename}`,
                        "name":`image_${index}`,  
                    })
                }); 

                res.status(200).json({
                    "status":200, 
                    "message": "abstract wallpapers fetched successfully",
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



app.get("/image-info", (_req, res) => {
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

app.listen(PORT,()=>{
    console.log(`Server start at PORT: ${PORT} ${commonPath}`)  
}) 