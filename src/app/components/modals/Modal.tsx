import { Box } from "@chakra-ui/react";

export default function Modal({ isOpen, onClose, children }: any) {
  if (!isOpen) return null;

  return (
    <Box className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className=" rounded-xl p-8 max-w-3xl w-full mx-2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xblue-500 hover:text-xblue-600 text-2xl"
        >
          &times;
        </button>
        {children}
      </div>
    </Box>
  );
}
