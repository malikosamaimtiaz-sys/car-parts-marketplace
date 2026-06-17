import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-8xl lg:text-9xl font-bold mb-6">404</h1>
        <h2 className="mb-6 text-3xl">Page Not Found</h2>
        <p className="text-muted-foreground mb-10 text-xl">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-6 justify-center">
          <Link
            to="/"
            className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-lg font-medium"
          >
            <Home className="w-6 h-6" />
            Go Home
          </Link>
          <Link
            to="/browse"
            className="flex items-center gap-3 bg-secondary text-secondary-foreground px-8 py-4 rounded-xl hover:bg-secondary/80 transition-colors text-lg font-medium"
          >
            <Search className="w-6 h-6" />
            Browse Parts
          </Link>
        </div>
      </div>
    </div>
  );
}
