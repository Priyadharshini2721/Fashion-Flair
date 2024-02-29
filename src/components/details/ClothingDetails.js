import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ClothingDetails.css';
import { useCart } from '../cart/carcontext';

const ClothingDetails = ({ selectedClothing }) => {
  const { id } = useParams();
  const { addToCart,removeFromCart,cartItems, isItemInCart  } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [isInBag, setIsInBag] = useState(false);
  const [isShaking, setIsShaking] = useState(false); // Track whether the button should shake

  useEffect(() => {
    // Add a timer to stop the shake effect after 0.5 seconds
    if (isShaking) {
      const shakeTimer = setTimeout(() => {
        setIsShaking(false);
      }, 500);
      return () => clearTimeout(shakeTimer);
    }
  }, [isShaking]);

  console.log(cartItems,id)
  const itemExists = isItemInCart(cartItems, selectedClothing.parent+selectedClothing.id);
  if (itemExists.found && !isInBag)
  {
    setIsInBag(true)
    setSelectedSize(itemExists.size)
  }

  if (!selectedClothing) {
    return <div>Item not found</div>;
  }

  // Log the selectedClothing object to verify its content
  console.log(selectedClothing);

  const handleSizeSelection = (size) => {
    if (!isInBag || size === null) setSelectedSize(size);
  };

  const handleToggleBag = () => {
    if (selectedSize ) {
      if ( !isInBag)
      {
      // Prepare the item data to be passed to the Cart screen
      addToCart({ id: selectedClothing.parent+selectedClothing.id, title: selectedClothing.title , price:selectedClothing.price,size: selectedSize, image: selectedClothing.image });
      setIsInBag(true)
      }
      else{
        removeFromCart(selectedClothing.parent+selectedClothing.id)
        setIsInBag(false)
        handleSizeSelection(null);
      }
      // Navigate to the Cart screen and pass the selected item as a query parameter
    } else {
      setIsShaking(true);
      setIsInBag(false)
    }
  };

  const filledStars = 4; // Replace this with the actual number of filled stars from the ratings

  const renderStarIcons = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i < selectedClothing.rating+1)
      {
        stars.push(
          <span key={i} className={ 'star-icon filled'}>
            &#9733;
          </span>
        );
      }
      else
      {
        stars.push(
          <span key={i} className={ 'star-icon'}>
            &#9733;
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="clothing-details-screen">
      <div className="clothing-details-left">
        <img src={selectedClothing.image} alt={selectedClothing.title} className="clothing-image" />
      </div>
      <div className="clothing-details-right">
        <div className="right-card-content">
          <h2 className="clothing-title">{selectedClothing.title}</h2>
          <p className="clothing-description">{selectedClothing.description}</p>
          <p className="clothing-price">Rs.{selectedClothing.price}</p>
          <div className="clothing-reviews">
            <div className="star-ratings">{renderStarIcons()}</div>
          </div>
          {selectedClothing.sizes && selectedClothing.sizes.length > 0 && (
            <div className="size-selection">
              <h3>Sizes</h3>
              <div className="size-options">
                {selectedClothing.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}${
                      isShaking ? 'shake' : ''
                    }`}
                    onClick={() => handleSizeSelection(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button
            className={`add-to-cart-button ${isInBag ? 'added' : ''} `}
            onClick={handleToggleBag}
          >
            {isInBag ? 'Remove from Bag' : 'Add to Bag'}
          </button>
          <p className="constant">Ultra Fine Stitching</p>
          <p className="constant">Natural Fabric</p>
          <p className="constant">Easy 14 days returns and exchanges</p>
        </div>
      </div>
    </div>
  );
};

export default ClothingDetails;
