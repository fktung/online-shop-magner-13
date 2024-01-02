import { useLayout } from "@/hooks/layouts";
import { InputSearchProduct } from "../input";
import { AiOutlineClose } from "react-icons/ai";

export const ModalSearchProduct = () => {
  const { isModalSearch, setIsModalSearch } = useLayout();
  return (
    <div
      className={`fixed transition-all duration-500 right-0 left-0 w-screen max-h-screen z-50 h-screen ${
        isModalSearch ? "top-0" : "-top-[120%]"
      }`}
    >
      <div className="relative w-full h-full pt-24">
        <div
          className="absolute top-0 bottom-0 left-0 right-0"
          onClick={() => setIsModalSearch(false)}
        />
        <div className="absolute left-0 right-0 w-full max-w-xl mx-auto">
          <div className="flex flex-col p-4 mx-4 bg-white drop-shadow-center-50 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-xl font-black">Cari Product</p>
              <button
                onClick={() => setIsModalSearch(false)}
                className="w-8 h-8 ml-auto text-xl text-center transition-all duration-300 hover:text-2xl"
              >
                <AiOutlineClose className="mx-auto" />
              </button>
            </div>
            <div className="z-40 pt-4">
              <InputSearchProduct className="mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
