import { useRef, useState } from "react";
import { Camera, Search } from "lucide-react";

import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import FloatingAI from "../../components/FloatingAI";

const RecognizePeople = () => {

  const fileRef = useRef();

  const [image,setImage] = useState(null);
  const [loading,setLoading] = useState(false);

  const handleImage = (e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = ()=>{
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSearch = async () => {

    if(!image){
      alert("Please upload a face image first");
      return;
    }

    try{

      setLoading(true);

      // TODO: replace with your backend API
      console.log("Sending image to backend...");

      /*
      const res = await fetch("http://localhost:5000/recognize",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({ image })
      });

      const data = await res.json();
      console.log(data);
      */

      setTimeout(()=>{
        setLoading(false);
        alert("Backend recognition will appear here");
      },1000);

    }catch(err){
      console.error(err);
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-background pb-20">

      <AppHeader
        title="Recognize Person"
        subtitle="Scan a face"
      />

      <main className="max-w-lg mx-auto px-4 py-8 text-center space-y-6">

        {/* Upload Face */}

        <button
          onClick={()=>fileRef.current.click()}
          className="w-44 h-44 border-2 border-dashed border-border rounded-xl flex items-center justify-center mx-auto bg-card shadow-soft"
        >

          {image ? (
            <img src={image} className="w-full h-full object-cover rounded-xl"/>
          ) : (
            <Camera size={28}/>
          )}

        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImage}
        />

        <p className="text-muted-foreground text-sm">
          Upload or capture a face
        </p>

        {/* Search Button */}

        <button
          onClick={handleSearch}
          className="bg-primary text-white px-5 py-2 rounded-full flex items-center gap-2 mx-auto shadow-soft"
        >

          <Search size={16}/>

          {loading ? "Searching..." : "Recognize Person"}

        </button>

      </main>

      <FloatingAI/>
      <BottomNav/>

    </div>
  );
};

export default RecognizePeople;