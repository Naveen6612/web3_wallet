import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Welcome to My Web Wallet
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Securely manage your digital assets in one place.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/generate-mnemonic")}
            className="bg-white border border-indigo-600 hover:bg-indigo-50 text-indigo-600 font-semibold py-2 px-4 rounded-xl"
          >
            Generate mnemonic
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
