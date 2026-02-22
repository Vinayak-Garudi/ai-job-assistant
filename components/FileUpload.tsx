"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, File, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

/**
 * FileUpload Component
 *
 * Handles resume file uploads (PDF, DOCX, DOC) to the backend API.
 *
 * API Details:
 * - Endpoint: POST /upload/single
 * - Field Name: "resume" (required by backend)
 * - Max Size: 10MB
 * - Formats: PDF, DOCX, DOC
 * - Authentication: Required (JWT via apiRequest)
 */

interface FileUploadProps {
  onUploadSuccess: (fileData: {
    url: string;
    fileName: string;
    uploadedAt: Date;
    publicId?: string;
    size?: number;
    format?: string;
    fileType?: string;
  }) => void;
  onUploadError?: (error: string) => void;
  acceptedFormats?: string[];
  maxSizeInMB?: number;
  currentFile?: {
    url: string;
    fileName: string;
    uploadedAt: Date;
  };
  disabled?: boolean;
}

export function FileUpload({
  onUploadSuccess,
  onUploadError,
  acceptedFormats = [".pdf", ".docx", ".doc"],
  maxSizeInMB = 10,
  currentFile,
  disabled = false,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return `File size must be less than ${maxSizeInMB}MB`;
    }

    // Check file format
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedFormats.includes(fileExtension)) {
      return `Only ${acceptedFormats
        .join(", ")
        .toUpperCase()} files are allowed`;
    }

    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      toast.error(validationError);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      // Backend expects 'file' field name for single file uploads
      formData.append("file", selectedFile);
      console.log("Uploading file:", selectedFile, "with formData:", formData);

      const response = await apiRequest("uploads/single", {
        method: "POST",
        body: formData,
      });

      if (response.success && response.data) {
        const uploadedFileData = {
          url: response.data.url,
          fileName: response.data.originalName || selectedFile.name,
          uploadedAt: response.data.uploadedAt
            ? new Date(response.data.uploadedAt)
            : new Date(),
          publicId: response.data.publicId,
          size: response.data.size,
          format: response.data.format,
          fileType: response.data.fileType,
        };

        onUploadSuccess(uploadedFileData);
        toast.success(response.message || "Resume uploaded successfully");
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        throw new Error(response.message || "Upload failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload file";
      toast.error(errorMessage);
      if (onUploadError) {
        onUploadError(errorMessage);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveSelected = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats.join(",")}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {/* Current file display */}
      {currentFile && !selectedFile && (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <File className="h-8 w-8 text-blue-600" />
            <div>
              <p className="font-medium">{currentFile.fileName}</p>
              <p className="text-sm text-muted-foreground">
                Uploaded:{" "}
                {new Date(currentFile.uploadedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          {!disabled && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleButtonClick}
              disabled={isUploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Replace
            </Button>
          )}
        </div>
      )}

      {/* Selected file preview */}
      {selectedFile && (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <File className="h-8 w-8 text-green-600" />
            <div>
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemoveSelected}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Upload area (shown when no current file and no selected file) */}
      {!currentFile && !selectedFile && (
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={handleButtonClick}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium mb-2">Upload your resume</p>
          <p className="text-sm text-muted-foreground mb-4">
            {acceptedFormats.join(", ").toUpperCase()} (Max {maxSizeInMB}MB)
          </p>
          <Button type="button" disabled={disabled || isUploading}>
            Choose File
          </Button>
        </div>
      )}
    </div>
  );
}
