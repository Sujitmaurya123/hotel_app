import React from "react";

interface GallerySectionProps {
    title: string;
    images: string[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ title, images }) => (
    <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {images.map((src, idx) => (
                <img
                    key={idx}
                    src={src}
                    alt={`${title} ${idx + 1}`}
                    className="w-full h-40 object-cover rounded shadow"
                />
            ))}
        </div>
    </div>
);

const GalleryPage: React.FC = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto mt-[90px]">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-xl font-bold">Gallery</h1>
                <p className="text-gray-600 mt-2">
                    Where every frame captures a moment of grandeur, Discover the soul of
                    royalty in every image.
                </p>
            </div>

            {/* Rooms */}
            <GallerySection
                title="Rooms"
                images={[
                    "/gallery/gallery1.png",
                    "/gallery/gallery2.png",
                    "/gallery/gallery3.png",
                    "/gallery/gallery4.png",
                    "/gallery/gallery5.png",

                    
                ]}
            />

            {/* Dining */}
            <GallerySection
                title="Dining"
                images={[
                    "/gallery/dining1.png",
                    "/gallery/dining2.png",
                    "/gallery/dining3.png",
                    "/gallery/dining4.png",

                ]}
            />

            {/* Event */}
            <GallerySection
                title="Event"
                images={[
                    "/gallery/event1.png",
                    "/gallery/event2.png",
                    "/gallery/event3.png",

                ]}
            />
        </div>
    );
};

export default GalleryPage;
