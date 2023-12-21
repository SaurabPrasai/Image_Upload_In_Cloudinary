const express=require('express');
require('dotenv').config();
const upload = require('./middleware/multer');
const uploadOnCloudinary = require('./cloudinary');
const app=express();


const port=3000;

app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('form')
})

app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        const data = await uploadOnCloudinary(req.file.path);
        console.log(data);
        res.status(200).render('home',{data})
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'File upload failed' });
    }
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})



