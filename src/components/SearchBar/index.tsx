import React from 'react'

const SearchBar = ({ placeholder = 'Search...', onSearch, onAction }: {
    placeholder: string;
    onSearch: (e: any) => void
    onAction: () => void
}) => {
    return (
      <div className="flex items-center justify-center p-4">
        <input
          type="text"
          className="w-full max-w-md px-4 py-2 border text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button type="button" onClick={onAction} className="p-2 rounded-lg ml-2 bg-yellow-500 hover:opacity-85 transition-all ease-in-out">🔍</button>
      </div>
    );
  };
  
  export default SearchBar;