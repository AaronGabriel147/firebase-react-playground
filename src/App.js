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
    if (!form.text) {
      alert("Todo cannot be blank.")
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


  return (
    <div className="app">
      <h1>NOTES</h1>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} />
        </div> */}

        <div>
          <textarea
            type="text"
            value={form.text}
            placeholder="Enter note..."
            onChange={e => setForm({ ...form, text: e.target.value })} />
        </div>

        <div className="buttons">
          <button className="ripple" type="submit">Submit</button>
        </div>
      </form>


      {/* CARDS */}

      <div>
        {quotes.map((quote, index) => (
          <div className="cards" key={quote.id} >
            <p dangerouslySetInnerHTML={{ __html: quote.text }}></p>
            {/* <p>{quote.text}</p> */}
            <button className="ripple" onClick={() => removeQuote(quote.id)}>Remove</button>
          </div>
        ))
        }

        {/* {JSON.stringify(form)} */}
      </div >
    </div >
  );
}


