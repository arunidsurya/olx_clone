import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/FirebaseContext'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth,firestore } from '../../firebase/config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Create = () => {
  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const date = new Date();
  const history = useHistory()

  const handleSubmit = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, `/image/${image.name}`);
  
    try {
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      console.log(imageUrl);
      await setDoc(doc(collection(firestore,"products")),{
        name,
        category,
        price,
        imageUrl,
        userId:user.uid,
        createdAt:date.toDateString()
      })

      history.push('/')

    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="name"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input 
            className="input" 
            type="number" 
            id="price" 
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            name="Price" 
            />
            <br />

          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>

            <br />
            <input onChange={(e)=>{
                setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
