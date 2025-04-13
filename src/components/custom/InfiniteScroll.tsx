const leftScrollTopics = [
  "Tech Innovations",
  "AI Breakthroughs",
  "Space Exploration",
  "Scientific Discoveries",
  "Coding Tutorials",
  "Developer Tools",
  "Cybersecurity Alerts",
  "Blockchain News",
];

const rightScrollTopics = [
  "Celebrity Gossip",
  "Box Office Hits",
  "Music Charts",
  "TV Show Updates",
  "Travel Destinations",
  "Fashion Trends",
  "Sports Highlights",
  "Gaming News",
];

interface Ctype {
  type: "left" | "right";
}

const InfiniteScroll = (prop: Ctype) => {
  const correctAnimation = {
    left: {
      animation: "animate-infinite-scroll-left",
      arrayName: leftScrollTopics,
    },
    right: {
      animation: "animate-infinite-scroll-right",
      arrayName: rightScrollTopics,
    },
  };

  return (
    <div className="relative h-12 w-full overflow-hidden group">
      {/* Gradient fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background via-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background via-background to-transparent z-10 pointer-events-none" />

      {/* Duplicated items for seamless looping */}
      <div
        className={`absolute h-full flex items-center ${
          correctAnimation[prop.type].animation
        } whitespace-nowrap animate-infinite-scroll`}
      >
        {[
          ...correctAnimation[prop.type].arrayName,
          ...correctAnimation[prop.type].arrayName,
        ].map((topic, index) => (
          <div key={`${topic}-${index}`} className="inline-flex mx-1">
            <button className="h-10 px-6 bg-foreground hover:bg-gray-400 text-background text-sm font-medium rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
              {topic}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
