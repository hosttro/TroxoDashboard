import React, {
  useState,
  useCallback,
  useRef,
  memo
} from "react";
import { useAppContext } from "../context/AppContext";

const MAX_SIZE = 5 * 1024 * 1024;
const ACCEPT_TYPES = ["application/pdf", "image/png", "image/jpeg"];

const FileUpload = () => {
  const { state, dispatch } = useAppContext();
  const {
    personalSignUp: { file }
  } = state;

  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const updateFile = useCallback(
    (f) =>
      dispatch({
        type: "UPDATE_SIGNUP_FIELD",
        field: "file",
        value: f
      }),
    [dispatch]
  );

  const validateAndSet = useCallback(
    (f) => {
      if (!ACCEPT_TYPES.includes(f.type)) {
        setError("نوع الملف غير مدعوم");
        return;
      }
      if (f.size > MAX_SIZE) {
        setError("الحجم لا يتجاوز 5 ميغابايت");
        return;
      }
      updateFile(f);
      setError("");
    },
    [updateFile]
  );

  const handleFile = useCallback(
    (f) => {
      validateAndSet(f);
      setDragActive(false);
    },
    [validateAndSet]
  );

  const handleChange = useCallback(
    (e) => {
      if (e.target.files[0]) handleFile(e.target.files[0]);
    },
    [handleFile]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragActive(false);
  }, []);

  const openFileDialog = useCallback(() => {
    inputRef.current.click();
  }, []);

  return (
    <div className="p-4">
      <div
        role="button"
        tabIndex={0}
        aria-label="رفع الملف"
        className={`border-2 border-dashed p-6 text-center rounded-lg transition-colors cursor-pointer 
          ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-400"}`}
        onClick={openFileDialog}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <img
          src="/images/FileUploadIcone.svg"
          alt=""
          className="w-6 mx-auto mb-2"
          aria-hidden="true"
        />
        <p className="font-semibold mb-1">أرفق السجل التجاري</p>
        <p className="text-sm text-gray-600">
          اسحب وأفلت هنا أو انقر لتحميل (PDF/PNG/JPEG)
        </p>
        <input
          ref={inputRef}
          id="file-upload"
          type="file"
          accept={ACCEPT_TYPES.join(",")}
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {file && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg text-center">
          <p>
            الملف المحدد:{" "}
            <span className="font-medium">{file.name}</span>
          </p>
          <p className="text-sm text-gray-500">
            {(file.size / 1024 / 1024).toFixed(2)} ميغابايت
          </p>
        </div>
      )}

      {error && (
        <p className="text-red-500 mt-2 text-center">{error}</p>
      )}
    </div>
  );
};

export default memo(FileUpload);
