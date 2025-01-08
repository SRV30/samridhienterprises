import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 via-white to-gray-400 text-white text-center">
      <div className="relative">
        <h1 className="text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500 drop-shadow-lg">
          404
        </h1>
        <div className="absolute inset-0 animate-ping text-[10rem] font-extrabold text-blue-700 opacity-20">
          404
        </div>
      </div>

      <p className="text-3xl font-semibold mt-6 animate-fade-in text-blue-900">
        Oops! The page you are looking for does not exist.
      </p>
      <p className="text-blue-900 mt-3 animate-fade-in-slow">
        It might have been moved or deleted.
      </p>

      <Link to="/" className="mt-8 mb-8">
        <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-900 text-white rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl hover:from-blue-600 hover:to-green-500">
          Go Back Home
        </button>
      </Link>

      <div className="absolute bottom-10 flex space-x-4 animate-float">
        <div className="w-12 h-12 bg-blue-500 rounded-full shadow-lg"></div>
        <div className="w-8 h-8 bg-green-400 rounded-full shadow-lg"></div>
        <div className="w-10 h-10 bg-blue-300 rounded-full shadow-lg"></div>
        <div className="w-6 h-6 bg-green-500 rounded-full shadow-lg"></div>
      </div>
    </div>
  );
};

export default NotFound;