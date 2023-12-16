export const renderHighlightedText = (text, match) => {
  const parts = text.split(new RegExp(`(${match})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part?.toLowerCase() === match?.toLowerCase() ? (
          <strong key={i}>{part}</strong>
        ) : (
          part
        )
      )}
    </span>
    // This logic checks for matching text and wraps it in a <strong> tag
  );
};
