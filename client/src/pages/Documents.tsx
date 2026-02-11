import { useAuth } from '@/_core/hooks/useAuth';
import FileManager from '@/components/FileManager';
import { Button } from '@/components/ui/button';
import { getLoginUrl } from '@/const';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Documents() {
  const { isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-gray-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4">Access Your Portfolio Files</h1>
          <p className="text-gray-600 mb-8">
            Sign in to upload, manage, and organize your CV, certificates, and professional documents.
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" className="w-full">
              Sign In to Continue
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Button>
          <h1 className="text-4xl font-bold mb-2">Portfolio Files</h1>
          <p className="text-gray-600">
            Upload and manage your CV, certificates, and professional documents
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <FileManager />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">📄 Organize</h3>
            <p className="text-gray-600 text-sm">
              Categorize your files by type and keep everything organized in one place.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">🔒 Control</h3>
            <p className="text-gray-600 text-sm">
              Choose which files are public and which are private for your eyes only.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">⚡ Share</h3>
            <p className="text-gray-600 text-sm">
              Easily share your public files with recruiters and potential clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
