import "../../Styles/VideoEmbed.css";

const getEmbedUrl = (url, start, end) => {
  let videoId = "";

  if (url.includes("youtu.be")) {
    videoId = url.split("/").pop().split("?")[0];
  } else if (url.includes("youtube.com/watch")) {
    videoId = new URL(url).searchParams.get("v");
  } else {
    return url; // already an embed URL, fallback
  }

  let embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const params = [];
  if (start) params.push(`start=${start}`);
  if (end) params.push(`end=${end}`);
  if (params.length) embedUrl += `?${params.join("&")}`;

  return embedUrl;
};

const VideoEmbed = ({ url, title, start, end }) => {
  return (
    <div className="video-embed-wrapper">
      <iframe
        src={getEmbedUrl(url, start, end)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoEmbed;