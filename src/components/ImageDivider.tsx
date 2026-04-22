interface ImageDividerProps {
  image: string;
  alt: string;
  height?: string;
}

const ImageDivider = ({ image, alt, height = "h-48 md:h-64" }: ImageDividerProps) => (
  <div className={`w-full overflow-hidden ${height}`}>
    <img
      src={image}
      alt={alt}
      loading="lazy"
      className="h-full w-full object-cover"
    />
  </div>
);

export default ImageDivider;
