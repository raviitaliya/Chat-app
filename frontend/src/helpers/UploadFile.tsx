
const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`;


const uploadFiles = async(file: string | Blob)=>{
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string);
    const res = await fetch(url, {
        method: "POST",
        body: formdata
    });
    const fileData = await res.json();
    return fileData;
  
    
}

export default uploadFiles;