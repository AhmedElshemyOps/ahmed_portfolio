# File Storage Feature Guide

## Overview

Your portfolio website now includes a **File Storage** feature that allows you to upload, organize, and manage your professional documents including your CV, certifications, and other credentials. All files are securely stored in the cloud and can be easily shared with recruiters and potential clients.

## Features

### 📁 File Management
- **Upload Files**: Upload your CV, certificates, diplomas, and other professional documents
- **Organize by Category**: Automatically categorize files (CV, Lean Six Sigma, CAPM, ITIL, IATA, Other)
- **Custom Labels**: Give files custom display names for easy identification
- **Privacy Control**: Choose which files are public (visible to all) or private (for your eyes only)
- **Quick Download**: Download your files anytime with a single click
- **Delete Files**: Remove files you no longer need

### 🔒 Security & Privacy
- Files are stored in secure cloud storage (S3)
- Only authenticated users can upload files
- Private files are only accessible to you
- Public files can be shared via direct links
- All file operations are logged and tracked

### 📊 Supported File Types
- **Documents**: PDF, Word (.doc, .docx)
- **Images**: JPG, JPEG, PNG, GIF
- **File Categories**: CV, Certificates, Documents, Images

## How to Use

### Accessing the File Manager

1. **Sign In**: Click the "Files" link in the navigation menu
2. **Authenticate**: If not already signed in, you'll be prompted to log in with your credentials
3. **View Your Files**: See all your uploaded files organized by category

### Uploading a File

1. Click the **"Upload File"** button in the File Manager
2. **Select File**: Choose a file from your computer
3. **Choose File Type**: Select whether it's a CV, Certificate, Document, or Image
4. **Select Category**: Choose the appropriate category (e.g., "Lean Six Sigma Certificate")
5. **Add Display Name**: Give the file a friendly name (e.g., "Lean Six Sigma Black Belt Certificate")
6. **Set Privacy**: Check "Make this file publicly visible" if you want to share it
7. **Upload**: Click "Upload File" to save it to the cloud

### Managing Your Files

**Download**: Click the download icon next to any file to save it to your computer

**Delete**: Click the trash icon to remove a file (you'll be asked to confirm)

**Update**: Click on a file to edit its:
- Display name
- Category
- Privacy settings

### Sharing Your Files

**Public Files**: Share the direct S3 URL with recruiters and clients
**Private Files**: Only you can access these files
**Recommended**: Make your CV and key certifications public for easy sharing

## File Organization Best Practices

### Recommended File Structure

```
Portfolio Files
├── CV
│   └── Ahmed-Mahmoud-CV-2026.pdf
├── Lean Six Sigma Certificate
│   └── LSSBB-Certificate-2024.pdf
├── CAPM Certification
│   └── CAPM-Certificate-2023.pdf
├── ITIL Certification
│   └── ITIL-V4-Foundation-2023.pdf
├── IATA Diplomas
│   └── IATA-Diploma-2022.pdf
└── Other Documents
    └── References-Letter.pdf
```

### Naming Conventions

Use clear, descriptive names:
- ✅ "Lean Six Sigma Black Belt Certificate 2024"
- ❌ "certificate.pdf"

Include dates for time-sensitive documents:
- ✅ "CAPM Certification 2023"
- ❌ "CAPM"

## Technical Details

### Database Schema

Files are stored with the following metadata:

```
- File ID: Unique identifier
- User ID: Associated with your account
- File Name: Original filename
- File Type: cv, certificate, document, or image
- MIME Type: application/pdf, image/jpeg, etc.
- File Size: Size in bytes
- S3 Key: Cloud storage location
- S3 URL: Public download URL
- Category: Professional category
- Display Name: User-friendly label
- Is Public: Privacy setting (1 = public, 0 = private)
- Upload Date: When the file was uploaded
- Last Updated: When metadata was last changed
```

### API Endpoints

The file storage feature uses these tRPC procedures:

**List Files**
```typescript
trpc.files.list.useQuery()
// Returns: Array of all your portfolio files
```

**Upload File**
```typescript
trpc.files.upload.useMutation({
  fileName: string
  fileType: 'cv' | 'certificate' | 'document' | 'image'
  mimeType: string
  fileSize: number
  category?: string
  displayName?: string
  isPublic?: boolean
  fileData: string // Base64 encoded
})
```

**Get File**
```typescript
trpc.files.get.useQuery({ fileId: number })
// Returns: File metadata (if authorized)
```

**Delete File**
```typescript
trpc.files.delete.useMutation({ fileId: number })
// Returns: boolean (success)
```

**Update File**
```typescript
trpc.files.update.useMutation({
  fileId: number
  displayName?: string
  category?: string
  isPublic?: boolean
})
```

## Troubleshooting

### File Upload Fails

**Problem**: "Failed to upload file" error
**Solution**: 
- Check file size (should be under 50MB)
- Verify file format is supported
- Ensure you're signed in
- Try a different file

### Can't See Uploaded Files

**Problem**: Files don't appear in the list
**Solution**:
- Refresh the page
- Sign out and sign back in
- Check browser console for errors
- Contact support if issue persists

### File Won't Download

**Problem**: Download link doesn't work
**Solution**:
- Verify the file still exists (check file list)
- Try downloading from a different browser
- Check if the file is marked as private
- Contact support if issue persists

## Best Practices

### Security
✅ Keep sensitive documents private until ready to share
✅ Use strong, unique display names
✅ Regularly review which files are public
✅ Delete outdated versions of documents

### Organization
✅ Use consistent naming conventions
✅ Categorize files properly
✅ Keep only current versions
✅ Update metadata when information changes

### Sharing
✅ Share public file URLs with recruiters
✅ Include file links in email signatures
✅ Add file links to LinkedIn profile
✅ Update files when certifications renew

## Support

For issues or questions about the File Storage feature:

1. Check the troubleshooting section above
2. Review the API documentation
3. Contact the development team with:
   - What you were trying to do
   - What error you received
   - Screenshots if applicable
   - Your browser and device information

## Future Enhancements

Planned improvements to the File Storage feature:

- [ ] Bulk upload multiple files at once
- [ ] File preview before download
- [ ] Advanced search and filtering
- [ ] File sharing with expiration dates
- [ ] Version history and rollback
- [ ] Automatic file backup
- [ ] Integration with LinkedIn
- [ ] QR code sharing for files

## FAQ

**Q: How much storage do I have?**
A: Your storage is unlimited for professional documents.

**Q: Can I make files private after uploading?**
A: Yes, you can update privacy settings anytime.

**Q: What happens if I delete a file?**
A: The file is permanently removed from your portfolio.

**Q: Can I download all files at once?**
A: Not yet, but this feature is planned.

**Q: Are my files backed up?**
A: Yes, all files are automatically backed up in secure cloud storage.

**Q: Can I share files with specific people?**
A: Currently, files are either public or private. Selective sharing is planned.

**Q: What file formats are supported?**
A: PDF, Word (.doc, .docx), and images (JPG, PNG, GIF).

**Q: Is there a file size limit?**
A: Files should be under 50MB for optimal performance.

---

**Last Updated**: February 2026
**Version**: 1.0
