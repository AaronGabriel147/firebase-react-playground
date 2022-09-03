//  This allows for line breaks in textarea. 
// <p dangerouslySetInnerHTML={{ __html: quote.text }}></p>

import './App.css';
import { db } from "./firebase.config";
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  ref
} from "firebase/firestore";


export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    text: "",
  });
  // const [imageUpload, setImageUpload] = useState(null);


  const quotesCollectionRef = collection(db, "quotes");

  // Read
  useEffect(() => {
    onSnapshot(quotesCollectionRef, (snapshot) => {
      setQuotes(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }))
    })
  }, [])

  // Create
  const handleSubmit = e => {
    e.preventDefault()
    if (!form.title) {
      alert("Title cannot be blank.")
      return
    }

    addDoc(quotesCollectionRef, form)
    setForm({
      title: "",
      text: ""
    })
  }

  // Delete
  const removeQuote = id => deleteDoc(doc(db, "quotes", id))


  // ----------------------------------------


  // const uploadImage = e => {
  //   if (imageUpload == null) {
  //     alert("Please select an image.")
  //     return
  //   }

  //   const imageRef = ref(db, `images/${imageUpload.name}`)

  // }

  return (
    <div className="app">

      {/* FORM */}


      <form onSubmit={handleSubmit}>


        {/* <input
          id="choose-file"
          type="file"
          onChange={e => setImageUpload(e.target.files[0])}
        />
        <button onClick={uploadImage}>Upload</button> */}

        {/* {imageUrls.map((url) => {
          return <img src={url} />;
        })} */}

        <div>
          <label>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>

        {/* <div>
          <label>Text</label>
          <textarea
            type="text"
            value={form.text}
            onChange={e => setForm({ ...form, text: e.target.value })} />
        </div> */}

        <div className="buttons">
          <button classNAme="ripple" type="submit">Submit</button>
        </div>
      </form>


      {/* CARDS */}

      <div>
        {quotes.map((quote, index) => (
          <div className="cards" key={quote.id} >
            <p>{quote.title}</p>
            <p>{quote.text}</p>
            <button classNAme="ripple" className="remove" onClick={() => removeQuote(quote.id)}>Remove</button>
          </div>
        ))
        }

        {/* {JSON.stringify(form)} */}
      </div >
    </div >
  );
}


