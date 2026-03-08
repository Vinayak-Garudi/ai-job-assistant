"use client";

import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Upload, File, Loader2 } from "lucide-react";
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

export interface FileUploadHandle {
  triggerFileSelect: () => void;
}

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
  onDelete?: () => void;
  acceptedFormats?: string[];
  maxSizeInMB?: number;
  currentFile?: {
    url: string;
    fileName: string;
    uploadedAt: Date;
  };
  disabled?: boolean;
}

export const FileUpload = forwardRef<FileUploadHandle, FileUploadProps>(
  function FileUpload(
    {
      onUploadSuccess,
      onUploadError,
      onDelete,
      acceptedFormats = [".pdf", ".docx", ".doc"],
      maxSizeInMB = 10,
      currentFile,
      disabled = false,
    },
    ref,
  ) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      triggerFileSelect: () => fileInputRef.current?.click(),
    }));

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

    const handleFileSelect = async (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
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

      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await apiRequest("uploads/single", {
          method: "POST",
          body: formData,
        });

        if (response.success && response.data) {
          const uploadedFileData = {
            url: response.data.url,
            fileName: response.data.originalName || file.name,
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
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
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
        {currentFile && (
          <div className="relative flex items-center p-4 border rounded-lg bg-muted/50 overflow-hidden">
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/70 rounded-lg z-10">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2 text-sm font-medium">Uploading...</span>
              </div>
            )}
            <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
              <File className="h-8 w-8 text-blue-600 shrink-0" />
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                  {currentFile.fileName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Uploaded:{" "}
                  {new Date(currentFile.uploadedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Upload area (shown when no current file) */}
        {!currentFile && (
          <div
            className="relative border-2 border-dashed rounded-lg p-8 text-center transition-colors"
            onClick={!isUploading && !disabled ? handleButtonClick : undefined}
            style={{ cursor: isUploading || disabled ? "default" : "pointer" }}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-12 w-12 mx-auto mb-4 text-primary animate-spin" />
                <p className="font-medium mb-2">Uploading...</p>
                <p className="text-sm text-muted-foreground">Please wait</p>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-medium mb-2">Upload your resume</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {acceptedFormats.join(", ").toUpperCase()} (Max {maxSizeInMB}
                  MB)
                </p>
                <Button
                  type="button"
                  disabled={disabled}
                  className="hover:border-primary/50"
                >
                  Choose File
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    );
  },
);
