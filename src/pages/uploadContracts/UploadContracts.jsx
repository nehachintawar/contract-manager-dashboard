import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

const STATUS = {
  UPLOADING: "Uploading",
  SUCCESS: "Success",
  ERROR: "Error",
};

function UploadModal({ onClose, onUploadSuccess }) {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleBrowse = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const filesWithStatus = newFiles.map((file) => ({
      file,
      status: STATUS.UPLOADING,
    }));
    setFiles((prev) => [...prev, ...filesWithStatus]);
    filesWithStatus.forEach((f, idx) => simulateUpload(f, files.length + idx));
  };

  const simulateUpload = (fileObj, index) => {
    setTimeout(() => {
      const isSuccess = true; // Always succeed for demo, change to Math.random() > 0.2 for random
      setFiles((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          status: isSuccess ? STATUS.SUCCESS : STATUS.ERROR,
        };
        // On success, close modal and add file to parent
        if (isSuccess && onUploadSuccess) {
          onUploadSuccess(updated[index].file);
          onClose();
        }
        return updated;
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Upload Contracts</h2>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition mb-4"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
          <span className="text-gray-500">
            Drag & drop files here or{" "}
            <span className="text-blue-600 underline">browse</span>
          </span>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleBrowse}
          />
        </div>
        <div>
          {files.length > 0 ? (
            <ul className="space-y-2">
              {files.map((f, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between bg-gray-50 rounded px-3 py-2"
                >
                  <span className="truncate max-w-[140px] text-gray-700">
                    {f.file.name}
                  </span>
                  <span
                    className={
                      f.status === STATUS.UPLOADING
                        ? "text-yellow-500"
                        : f.status === STATUS.SUCCESS
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {f.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm text-center">
              No files selected yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Component() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleUploadSuccess = (file) => {
    setUploadedFiles((prev) => [...prev, file]);
  };

  return (
    <div className="min-h-svh w-full flex flex-col items-center p-6 md:p-10">
      <div className="w-full">
        <button
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          Upload File
        </button>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Uploaded Files</h3>
          {uploadedFiles.length > 0 ? (
            <ul className="space-y-2">
              {uploadedFiles.map((file, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between bg-gray-50 rounded px-3 py-2"
                >
                  <span className="truncate max-w-[180px] text-gray-700">
                    {file.name}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm text-center">
              No files uploaded yet.
            </p>
          )}
        </div>
      </div>
      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
}

Component.displayName = "UploadContracts";
