"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Search, Loader2 } from "lucide-react";

interface Result {
  prompt: string;
  imageUrl: string;
}

const SearchComponent = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Result[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("/api/search", { query });
      setResults(response.data.results || []);
    } catch (error) {
      console.error("Search Error:", error);
      setResults([]);
    } finally {
      setQuery("");
      setIsLoading(false);
    }
  };

  const closeResults = () => setResults(null);

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node)
      ) {
        closeResults();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full space-x-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for something..."
          className="flex-grow px-6 md:w-[500px] w-[270px] py-3 text-base text-black border border-black border-opacity-25 rounded-full bg-transparent focus:outline-none"
        />
        <button
        disabled={isLoading}
          type="submit"
          className="px-6 py-3.5 text-base text-white bg-black rounded-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
            </>
          ) : (
            <>
              <Search size={17} />
            </>
          )}
        </button>
      </form>

      {/* Results */}
      {results !== null && (
        <div
          ref={resultsRef}
          className={`mt-5 w-full max-w-6xl z-50 bg-white border border-gray-200 rounded-lg shadow-lg px-4 pt-3 pb-10 transition-transform duration-300 ${
            results ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
          }`}
        >
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <p className="text-base font-semibold mb-3">{result.prompt}</p>
                <img
                  src={result.imageUrl}
                  alt="Generated"
                  className="w-full rounded-lg border"
                />
              </div>
            ))
          ) : (
            <p className="text-base text-gray-500">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;