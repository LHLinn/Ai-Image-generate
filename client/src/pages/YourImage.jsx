import React, { useState, useEffect } from 'react';
import { Dialog } from '../components';
import { Loader, Card, FormField } from "../components";

const YourImage = ({ isLoggedin, savedUsername }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async (username) => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/v1/yourimage?username=${encodeURIComponent(username)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    if (savedUsername) {
      fetchImages(savedUsername);
    }
  }, [savedUsername]);

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => (
        <div key={post._id} className="relative group">
          <img src={post.photo} alt={post.prompt} className="w-full h-auto object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
            <p className="text-white text-lg">{post.prompt}</p>
          </div>
        </div>
      ));
    }
    return (
      <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      {isLoggedin ? (
        <>
          <div>
            <h1 className="font-extrabold text-[#222328] text-[32px]">Your Images</h1>
            <p className="mt-2 text-[#666e75] text-[24px] max-w[500px]">
              Browse through your collection of AI-generated images
            </p>
          </div>
          <div className="mt-16">
            {loading ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                <RenderCards data={allPosts} title="No images found" />
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="text-center mt-10 font-medium text-xl text-[#222328]">
          Please log in first to see your images.
        </p>
      )}
    </section>
  );
};


export default YourImage;
