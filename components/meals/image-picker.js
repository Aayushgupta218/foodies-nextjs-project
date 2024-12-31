'use client';
import { useRef, useState } from 'react';
import classes from './image-picker.module.css'
import Image from 'next/image';

export default function ImagePicker({label,name}){

    const [pickedImage, setpickedImage] = useState();
    const imageInput = useRef();

    function handlePickleClick(){
         imageInput.current.click();
    }

    function handleImagechange(event){
       const file = event.target.files[0];

    if(!file){
        setpickedImage(null);
        return;
    }

      const fileReader = new FileReader();

      fileReader.onload = () => {
        setpickedImage(fileReader.result);
      };

      fileReader.readAsDataURL(file);

    }
    return (
     <div className={classes.picker}>
       <label htmlFor={name}>{label}</label>
       <div className={classes.controls}>
        <div className={classes.preview}>
            {!pickedImage && <p>No Image picked yet.</p>}
            {pickedImage && <Image 
            src={pickedImage}
            alt = "The image selected by the user."
            fill
            />}
        </div>
        <input 
        className={classes.input}
        type="file" 
        id={name}
        accept="image/png, image/jpeg"
        name={name}
        ref={imageInput}
        onChange={handleImagechange}
        required
        />
        <button className={classes.button} type="button"
        onClick={handlePickleClick}
        >
            Pick an Image
            </button>
       </div>
     </div>
    );
}