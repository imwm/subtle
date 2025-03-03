const YouTubeEmbed = ({ videoId }) => {
  return (
    <div className="aspect-w-16 aspect-h-9 w-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-64"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed; 