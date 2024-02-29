import React, { useState, useEffect } from 'react';
import './men.css';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import 'firebase/storage';
import { getDocs, collection } from "firebase/firestore";

const Men = ({ setSelectedClothing }) => {
  const [clothesData, setClothesData] = useState([]);

  useEffect(() => {
    // Fetch data from Firestore collection "menClothes"
    const fetchData = async () => {
      try {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "mensCollection"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push({
            "parent":"mens",
            "id": doc.id,
            "title": doc.data().Title,
            "image": doc.data().Image,
            "price": doc.data().Price,
            "description": doc.data().Description,
            "sizes": doc.data().Sizes,
            "rating":doc.data().Rating
          });
        });
        console.log(data);
        setClothesData(data);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle the selection of a clothing item
  const handleClothingSelection = (clothing) => {
    setSelectedClothing(clothing); // Update selectedClothing when clicked
  };

  return (
    <div className="mclothes-screen">
      <div className="mclothes-container">
        {clothesData.map((clothing) => (
          <Link
            to={`/clothing/${clothing.id}`}
            key={clothing.id}
            className="mclothing-card"
            onClick={() => handleClothingSelection(clothing)}
          >
            <img src={clothing.image} alt={clothing.title} className="mclothing-image" />
            <h3 className="mclothing-title">{clothing.title}</h3>
            <p className="mclothing-description">{clothing.description}</p>
            <p className="mclothing-price">Rs.{clothing.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Men;
