import { useEffect, useState } from 'react';

interface Wine {
  winery: string;
  wine: string;
  rating: {
    average: string;
    reviews: string;
  };
  location: string;
  image: string;
  id: number;
}

const WineInfo = () => {
  const [wines, setWines] = useState<Wine[]>([]);

  // Fetch wine data from the API
  const fetchWines = async () => {
    try {
      const response = await fetch('https://api.sampleapis.com/wines/reds');
      const wineData: Wine[] = await response.json();
      
      // Select three random wines
      const randomWines = [];
      while (randomWines.length < 3) {
        const randomWine = wineData[Math.floor(Math.random() * wineData.length)];
        if (!randomWines.includes(randomWine)) {
          randomWines.push(randomWine);
        }
      }
      
      setWines(randomWines);
    } catch (error) {
      console.error('Error fetching wines:', error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchWines();
  }, []);

  return (
    <div className="flex justify-center my-8">
      {wines.length > 0 ? (
        wines.map((wine) => (
          <div
            className="rounded overflow-hidden shadow-lg mx-4 bg-black text-white h-[350px] transition-transform duration-300 transform hover:scale-105" // Hover effect added here
            style={{ width: '50vh' }} // Set fixed width
            key={wine.id}
          >
            {/* Centering the image */}
            <div className="flex justify-center h-48 bg-white">
              <img
                className="object-contain h-full w-auto"
                src={wine.image}
                alt={wine.wine}
                style={{ maxHeight: '200px', maxWidth: '100%' }} // Ensure the image doesn't overflow
              />
            </div>
            <div className="px-6 py-4 h-[calc(100%-48px)] flex flex-col justify-between"> {/* Adjusting height for content */}
              <div>
                <div className="font-bold text-xl mb-1">{wine.wine}</div>
                <p className="text-gray-300 text-base mb-1">{wine.winery}</p>
                <p className="text-gray-300 text-base mb-1">Location: {wine.location}</p>
                <p className="text-gray-300 text-base">
                  Rating: <span className="font-semibold text-yellow-300">{wine.rating.average}</span> ({wine.rating.reviews})
                </p>
              </div>
              <div className="pt-4">
                <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-200">Available</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Loading wine information...</p>
      )}
    </div>
  );
};

export default WineInfo;
