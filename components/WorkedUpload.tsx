import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, UploadCloud, Check, AlertCircle } from "lucide-react";
import toast from 'react-hot-toast';

interface FileWithPreview {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview: string;
}

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  isCover?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onUpload, 
  maxFiles = 5,
  maxSize = 2 * 1024 * 1024, // 2MB default
  isCover = false
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  // const validateFile = (file: File) => {
  //   if (!file.type.startsWith('image/')) {
  //     throw new Error(`${file.name} is not an image file`);
  //   }

  //   if (file.size > maxSize) {
  //     throw new Error(`${file.name} is larger than ${maxSize / 1024 / 1024}MB`);
  //   }

  //   return true;
  // };

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach((error: any) => {
        switch (error.code) {
          case 'file-too-large':
            toast.error(`${file.name} is too large. Max size is ${maxSize / 1024 / 1024}MB`);
            break;
          case 'file-invalid-type':
            toast.error(`${file.name} is not an allowed file type`);
            break;
          default:
            toast.error(`Error uploading ${file.name}`);
        }
      });
    });

    // For cover image, only allow one file
    if (isCover && files.length + acceptedFiles.length > 1) {
      toast.error('Only one cover image allowed');
      return;
    }

    // For regular images, check max files
    if (!isCover && files.length + acceptedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validateFile = (file: File) => {
      if (!file.type.startsWith('image/')) {
        throw new Error(`${file.name} is not an image file`);
      }
  
      if (file.size > maxSize) {
        throw new Error(`${file.name} is larger than ${maxSize / 1024 / 1024}MB`);
      }
  
      return true;
    };

    try {
      // Validate each file
      acceptedFiles.forEach(validateFile);

      // For cover image, replace existing file
      if (isCover) {
        // Remove old files and their previews
        files.forEach(file => {
          if (file.preview) {
            URL.revokeObjectURL(file.preview);
          }
        });

        const newFile = {
          file: acceptedFiles[0],
          id: Math.random().toString(36).substring(7),
          progress: 0,
          status: 'uploading' as const,
          preview: URL.createObjectURL(acceptedFiles[0])
        };

        setFiles([newFile]);
        simulateUploadProgress([newFile]);
        onUpload([acceptedFiles[0]]);
        return;
      }

      // For multiple images
      const newFiles = acceptedFiles.map(file => ({
        file,
        id: Math.random().toString(36).substring(7),
        progress: 0,
        status: 'uploading' as const,
        preview: URL.createObjectURL(file)
      }));
      
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      simulateUploadProgress(newFiles);
      onUpload(acceptedFiles);

    } catch (error: any) {
      toast.error(error.message);
    }
  }, [files, maxFiles, maxSize, onUpload, isCover]);

  const simulateUploadProgress = (newFiles: FileWithPreview[]) => {
    newFiles.forEach(fileObj => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress > 100) {
          clearInterval(interval);
          setFiles(prev => 
            prev.map(f => 
              f.id === fileObj.id 
                ? { ...f, status: 'completed', progress: 100 } 
                : f
            )
          );
        } else {
          setFiles(prev => 
            prev.map(f => 
              f.id === fileObj.id 
                ? { ...f, progress } 
                : f
            )
          );
        }
      }, 200);
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const updatedFiles = prev.filter(f => f.id !== id);
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      onUpload(updatedFiles.map(f => f.file));
      return updatedFiles;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize,
    multiple: !isCover,
    maxFiles: isCover ? 1 : maxFiles
  });

  return (
    <Card className="w-full mx-auto">
      <CardContent className="p-4">
        <div
          {...getRootProps()}
          className={`relative border-dashed border-2 border-gray-300 dark:border-gray-600 p-6 text-center rounded-lg cursor-pointer 
            hover:border-gray-400 dark:hover:border-gray-500 mb-4 
            ${isDragActive ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}
        >
          <input {...getInputProps()} />
          {files.length > 0 && files.some(f => f.status === 'uploading') ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-lg">
              <Progress 
                value={files.reduce((acc, file) => acc + file.progress, 0) / files.length} 
                className="w-1/2 h-2 mb-2" 
              />
              <p className="text-sm text-gray-600 dark:text-gray-300">Uploading...</p>
            </div>
          ) : (
            <>
              <UploadCloud className="mx-auto mb-2 h-8 w-8 text-gray-500 dark:text-gray-400" />
              <p className="text-gray-600 dark:text-gray-300">
                {isDragActive 
                  ? "Drop the files here..." 
                  : isCover 
                    ? "Drag & drop cover image here, or click to select"
                    : "Drag & drop product images here, or click to select"
                }
              </p>
              <Button type="button" variant="outline" className="mt-4 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                Select {isCover ? 'Cover Image' : 'Files'}
              </Button>
            </>
          )}
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={file.preview} 
                      alt="preview" 
                      className="h-10 w-10 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium truncate max-w-[200px] dark:text-gray-200">
                        {file.file.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === 'completed' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : file.status === 'error' ? (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : null}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                {file.status === 'uploading' && (
                  <Progress value={file.progress} className="h-1" />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;