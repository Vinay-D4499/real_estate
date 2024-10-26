import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md md:px-6 md:py-3 text-sm">
      <Link to="/" className="text-blue-600 hover:underline">
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span key={index} className="text-gray-500">
            {name}
          </span>
        ) : (
          <Link
            key={index}
            to={routeTo}
            className="text-blue-600 hover:underline"
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
