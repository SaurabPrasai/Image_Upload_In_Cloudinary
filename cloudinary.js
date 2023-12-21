const cloudinary=require('cloudinary').v2;
const fs=require('fs');
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        console.log(localFilePath);
        if(!localFilePath){
           throw Error("localPath not found!")
        }
        //upload a file on cloudinary
       const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded succefully
        console.log("file is uploaded in cloudinary",response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return error;
    }

}

module.exports=uploadOnCloudinary



// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });
