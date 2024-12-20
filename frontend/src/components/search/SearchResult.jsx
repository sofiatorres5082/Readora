export const SearchResult = ({ result, onSelect }) => {
    return (
      <div
        className="p-2 cursor-pointer hover:bg-gray-100"
        onClick={() => onSelect(result)}
      >
        {result.title || "Sin título"}
      </div>
    );
  };
  