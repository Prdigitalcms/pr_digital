import React from 'react';

const logos = [
  { src: "https://gallery.vision/wp-content/themes/Gallery-Vision/assets/images/apple.webp", name: "Apple" },
  { src: "https://gallery.vision/wp-content/themes/Gallery-Vision/assets/images/Spotify.webp", name: "Spotify" },
  { src: "https://gallery.vision/wp-content/themes/Gallery-Vision/assets/images/amazon.webp", name: "Amazon" },
  { src: "https://gallery.vision/wp-content/themes/Gallery-Vision/assets/images/tidal-b.webp", name: "Tidal" },
  { src: "https://gallery.vision/wp-content/themes/Gallery-Vision/assets/images/Facebook.webp", name: "Facebook" },
  { src: "https://gallery.vision/wp-content/themes/Gallery-Vision/assets/images/tiktok.webp", name: "TikTok" },
  { src: "https://gallery.vision/wp-content/themes/Gallery-Vision/assets/images/vevo.webp", name: "Vevo" },
   { src: "https://gallery.vision/wp-content/themes/Gallery-Vision/assets/images/apple.webp", name: "Apple" },
  { src: "https://gallery.vision/wp-content/themes/Gallery-Vision/assets/images/Spotify.webp", name: "Spotify" },
  { src: "https://gallery.vision/wp-content/themes/Gallery-Vision/assets/images/amazon.webp", name: "Amazon" },
  { src: "https://gallery.vision/wp-content/themes/Gallery-Vision/assets/images/tidal-b.webp", name: "Tidal" },
];

const Marquee: React.FC = () => {
  return (
    <div className="overflow-hidden w-full py-10 mt-10 bg- rounded-lg shadow-lg">
      <div className="flex w-max animate-marquee gap-10 items-center">
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={logo.src}
              alt={`icon-${index}`}
              className="max-h-[25px] h-auto drop-shadow"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
