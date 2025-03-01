import { AiOutlineSearch } from "react-icons/ai";

const Input = ({ handleSearch, setLocation }) => {
  return (
    <form className="flex items-center md:w-2/4 w-full order-2 md:order-1">
      <input
        type="text"
        placeholder="Search for a city"
        className="border-b-2 placeholder-white outline-none text-white"
        onKeyDown={handleSearch}
        onChange={(e) => setLocation(e.target.value)}
      />
      <div className="ml-[-25px]">
        <AiOutlineSearch color="white" />
      </div>
    </form>
  );
};

export default Input;