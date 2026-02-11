import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, Download, Trash2, FileText, Award, Image as ImageIcon, File, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const FILE_CATEGORIES = [
  { value: 'cv', label: 'Curriculum Vitae' },
  { value: 'lean-six-sigma', label: 'Lean Six Sigma Certificate' },
  { value: 'capm', label: 'CAPM Certification' },
  { value: 'itil', label: 'ITIL Certification' },
  { value: 'iata', label: 'IATA Diploma' },
  { value: 'other', label: 'Other Documents' },
];

const FILE_TYPES = [
  { value: 'cv', label: 'CV', icon: FileText },
  { value: 'certificate', label: 'Certificate', icon: Award },
  { value: 'document', label: 'Document', icon: File },
  { value: 'image', label: 'Image', icon: ImageIcon },
];

interface FileManagerProps {
  onFileUploaded?: () => void;
}

export default function FileManager({ onFileUploaded }: FileManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'cv' | 'certificate' | 'document' | 'image'>('document');
  const [category, setCategory] = useState('other');
  const [displayName, setDisplayName] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const filesQuery = trpc.files.list.useQuery();
  const uploadMutation = trpc.files.upload.useMutation();
  const deleteMutation = trpc.files.delete.useMutation();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setDisplayName(file.name);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = (e.target?.result as string).split(',')[1];
        
        await uploadMutation.mutateAsync({
          fileName: selectedFile.name,
          fileType,
          mimeType: selectedFile.type,
          fileSize: selectedFile.size,
          category,
          displayName: displayName || selectedFile.name,
          isPublic,
          fileData: base64Data,
        });

        toast.success('File uploaded successfully!');
        setSelectedFile(null);
        setDisplayName('');
        setIsOpen(false);
        filesQuery.refetch();
        onFileUploaded?.();
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (fileId: number) => {
    if (confirm('Are you sure you want to delete this file?')) {
      try {
        await deleteMutation.mutateAsync({ fileId });
        toast.success('File deleted successfully');
        filesQuery.refetch();
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete file');
      }
    }
  };

  const getFileIcon = (fileType: string) => {
    const type = FILE_TYPES.find(t => t.value === fileType);
    const IconComponent = type?.icon || File;
    return <IconComponent className="w-5 h-5" />;
  };

  const getCategoryLabel = (cat: string) => {
    return FILE_CATEGORIES.find(c => c.value === cat)?.label || cat;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Portfolio Files</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload File
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Portfolio File</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-input">Select File</Label>
                <Input
                  id="file-input"
                  type="file"
                  onChange={handleFileSelect}
                  className="mt-2"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="file-type">File Type</Label>
                <Select value={fileType} onValueChange={(value: any) => setFileType(value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FILE_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FILE_CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="display-name">Display Name</Label>
                <Input
                  id="display-name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="How should this file be labeled?"
                  className="mt-2"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is-public"
                  checked={isPublic}
                  onCheckedChange={(checked) => setIsPublic(checked as boolean)}
                />
                <Label htmlFor="is-public" className="cursor-pointer">
                  Make this file publicly visible
                </Label>
              </div>

              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {filesQuery.isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filesQuery.data && filesQuery.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filesQuery.data.map((file) => (
            <Card key={file.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-primary mt-1">
                    {getFileIcon(file.fileType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{file.displayName}</h3>
                    <p className="text-sm text-gray-600">
                      {getCategoryLabel(file.category || 'other')}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(file.fileSize / 1024).toFixed(2)} KB • {new Date(file.uploadedAt).toLocaleDateString()}
                    </p>
                    {!file.isPublic && (
                      <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                        Private
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-2">
                  <a href={file.s3Url} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" title="Download">
                      <Download className="w-4 h-4" />
                    </Button>
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(file.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">No files uploaded yet</p>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Your First File
              </Button>
            </DialogTrigger>
          </Dialog>
        </Card>
      )}
    </div>
  );
}
