import React, { useState, useEffect } from "react";

function ImagePicker({ onImageSelect }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchedImages, setFetchedImages] = useState([]);

  const selectImage = (url) => {
    setSelectedImage(url);
  };

  const handleSubmit = () => {
    if (selectedImage) {
      onImageSelect(selectedImage);
      document.getElementById("imagepicker_modal").close();
    }
  };

  // Fetch images aus Unsplash and speicher die antwort
  const searchImages = async () => {
    const accessKey = "K22tmtsdAY5-LyB9t5ZcrLMfXMKt40AAdXZEHNkqai0"; // access key
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${accessKey}&per_page=21`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const imageUrls = data.results.map((image) => image.urls.small); // URLs extrahieren
      setFetchedImages(imageUrls); // Update state mit image URLs
    } catch (error) {
      console.error("Failed to fetch from Unsplash:", error);
    }
  };

  return (
    <div>
      <button
        className="btn btn-success text-white w-40"
        onClick={() => document.getElementById("imagepicker_modal").showModal()}
      >
        Add Image
      </button>

      <dialog id="imagepicker_modal" className="modal">
        <div className="modal-box relative">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Search Images</h3>

          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered flex-grow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={searchImages}
              className="btn btn-success text-white ml-4"
            >
              Search
            </button>
          </div>

          {/* Image Picker Content */}
          <div className="carousel rounded-xl">
            {Array.from({ length: 7 }).map((_, slideIndex) => (
              <div
                id={`slide${slideIndex + 1}`}
                key={slideIndex}
                className="carousel-item relative w-full flex"
              >
                {fetchedImages
                  .slice(slideIndex * 3, slideIndex * 3 + 3)
                  .map((url, index) => (
                    <div key={index} className="relative w-1/3">
                      <img
                        src={url}
                        alt={`Image ${slideIndex * 3 + index + 1}`}
                        className="w-full object-cover cursor-pointer"
                        onClick={() => selectImage(url)}
                      />
                      {selectedImage === url && (
                        <div className="absolute inset-0 bg-success opacity-60 flex items-center justify-center">
                          <span className="text-white font-bold">Selected</span>
                        </div>
                      )}
                    </div>
                  ))}
                {/* Navigation buttons */}
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a
                    href={`#slide${slideIndex === 0 ? 7 : slideIndex}`}
                    className="btn btn-circle"
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide${slideIndex === 6 ? 1 : slideIndex + 2}`}
                    className="btn btn-circle"
                  >
                    ❯
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="modal-action">
            <button
              className="btn btn-success text-white"
              onClick={handleSubmit}
            >
              Save Image
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default ImagePicker;
