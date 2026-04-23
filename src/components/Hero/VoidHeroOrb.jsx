/**
 * VoidHeroOrb — Uses the actual Interstellar black hole image
 * with CSS-driven animated glow, slow drift, and parallax pulse.
 * No canvas needed — real image looks WAY better.
 */
export default function VoidHeroOrb() {
  return (
    <div className="void-orb-wrap" aria-hidden="true">
      {/* Ambient glow behind the image */}
      <div className="void-orb-glow" />
      {/* The actual black hole image */}
      <img
        src="/assets/blackhole.jpg"
        alt=""
        className="void-orb-img"
        draggable="false"
      />
      {/* Subtle overlay to blend edges into the black background */}
      <div className="void-orb-vignette" />
    </div>
  );
}
