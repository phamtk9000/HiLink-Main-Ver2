/**
 * Background media for page hero sections — an image or a looping video,
 * with a charcoal gradient overlay so foreground text stays legible.
 * Put it as the FIRST child of a `relative overflow-hidden` hero section,
 * and give the hero's content wrapper `relative z-10`.
 */
export function HeroBg({
  image,
  video,
  poster,
  opacity = 0.85,
}: {
  image?: string;
  video?: string;
  poster?: string;
  opacity?: number;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {video ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          className="w-full h-full object-cover"
          style={{ opacity }}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <img src={image} alt="" fetchPriority="high" decoding="async" className="w-full h-full object-cover" style={{ opacity }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#361716]/85 via-[#361716]/35 to-[#361716]/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#361716]/65 via-[#361716]/20 to-transparent" />
    </div>
  );
}
