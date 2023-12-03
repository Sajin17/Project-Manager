import { useState } from "react";
import { projectFirestore } from "../firebase/config";
import { useEffect } from "react";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id)
    const unsubscribe = ref.onSnapshot((snapshot) => {
      if(snapshot.data)
        {setDocument({...snapshot.data(), id: snapshot.id})
        setError(null)}
      else{
        setError('No data found!')
      }  
    },
    (err) => {
     setError('Failed to load document!')
  })
  return () => unsubscribe()
  }, [collection, id] )

 return { document, error }
}
 
