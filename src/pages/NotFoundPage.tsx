const NotFoundPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-5xl p-2 flex flex-col justify-center items-center">
        <img
          src="/error.png"
          alt="Not found page image"
          className="size-100 object-contain"
        />

        <div className="w-full flex flex-col justify-center items-center gap-2">
          <h1 className="text-4xl font-bold text-center">Page Not Found 👀</h1>
          <p className="text-lg text-center text-gray-600">
            Oops! The page you're looking for doesn't exist.
          </p>
          <a
            href="/"
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            Go Back Home
          </a>
        </div>
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-400">
            <a
              href="https://storyset.com/web"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors duration-200 underline decoration-slate-300 hover:decoration-orange-500 underline-offset-4"
            >
              Web illustrations by Storyset
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
