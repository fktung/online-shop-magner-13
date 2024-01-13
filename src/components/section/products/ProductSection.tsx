import { ButtonBlack } from "@/components/button";
import { TInputForm } from "@/components/input";
import { Pagination } from "@/components/pagination";
import { ProductWidget, ProductWidgetLoading } from "@/components/product";
import { WidgetFilterProduct } from "@/components/widgets";
import { ENDPOINT } from "@/constant/api.endpoint";
import { ROUTES } from "@/constant/routes";
import { ApiAxios } from "@/helpers/axios";
import saveSearchResults from "@/lib/saveSearch";
import { IPagination, IProducts } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  ChangeEvent,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";

export const ProductSection = () => {
  const router = useRouter();
  const query = useSearchParams();
  const divParentProductRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);
  const [isProducts, setisProducts] = useState<IProducts[]>([]);
  const [isPagination, setisPagination] = useState<IPagination>();
  const [isFilterPrice, setIsFilterPrice] = useState<string>("");
  const [inputs, setInputs] = useState<TInputForm>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPage, setIsPage] = useState("1");
  const [isLimit, setIsLimit] = useState("15");

  const scrollViewTop = () => {
    if (divParentProductRef.current) {
      divParentProductRef.current.scrollIntoView({ behavior: "smooth" });
      divParentProductRef.current.focus();
    }
  };

  let search = query.get("search") ? `&search=${query.get("search")}` : "";
  const ct = query.get("ct");
  const sct = query.get("sct");
  const ssct = query.get("ssct");
  const getProducts = async (page: string = isPage) => {
    let allCt = "";
    if (ct) {
      allCt = `&category_id=${ct}`;
    }
    if (sct) {
      allCt = `&sub_category_id=${sct}`;
    }
    if (ssct) {
      allCt = `&sub_sub_category_id=${ssct}`;
    }

    setIsLoading(true);
    try {
      const response = await ApiAxios.get(
        `${ENDPOINT.products.DEFAULT}?page=${page}${search}${allCt}&limit=${isLimit}${isFilterPrice}`
      );
      const data = await response.data;
      setisProducts(data.data);
      setisPagination(data.metadata);
      if (search !== "") {
        saveSearchResults(data.data);
      }
    } catch (error: any) {
      console.log("getProducts", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search !== "") {
      getProducts("1");
      setIsPage("1");
      return;
    }
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  useEffect(() => {
    const inputSet = () => {
      const min = inputs.pmin ? `&pmin=${inputs.pmin}` : "";
      const max = inputs.pmax ? `&pmax=${inputs.pmax}` : "";
      setIsFilterPrice(min + max);
    };

    inputSet();
  }, [inputs.pmax, inputs.pmin]);

  const getIsPage = (cur: string) => {
    setIsLoading(true);
    scrollViewTop();
    setIsPage(cur);
    getProducts(cur);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleProductsMinMax = (e: React.FormEvent) => {
    e.preventDefault();
    getProducts();
  };
  return (
    <div className="flex items-start gap-4" ref={divParentProductRef}>
      <div className="hidden xl:block w-full max-w-[16rem] mt-2">
        <WidgetFilterProduct
          setIsPage={setIsPage}
          isLimit={isLimit}
          setisProducts={setisProducts}
          setisPagination={setisPagination}
          setInputs={setInputs}
          filterPrice={setIsFilterPrice}
          handleSubmit={handleProductsMinMax}
          inputs={inputs}
          handleChange={handleChange}
        />
      </div>
      <Suspense fallback={<p className="bg-red-500">Loading feed...</p>}>
        <div className="relative w-full">
          {isLoading && (
            <div className="absolute top-0 bottom-0 left-0 right-0 z-10 grid w-full place-items-center">
              {/* <LoadingLoadData /> */}
            </div>
          )}
          <div className="">
            <div className="xl:hidden">
              <WidgetFilterProduct
                setIsPage={setIsPage}
                isLimit={isLimit}
                setisProducts={setisProducts}
                setisPagination={setisPagination}
                setInputs={setInputs}
                filterPrice={setIsFilterPrice}
                handleSubmit={handleProductsMinMax}
                inputs={inputs}
                handleChange={handleChange}
              />
            </div>
            <div className="items-center justify-between px-2 xl:px-4 sm:flex">
              <p className="text-sm xl:text-base">
                Menampilkan{" "}
                <span className="font-extrabold">
                  Total {isPagination?.total}
                </span>{" "}
                untuk pencarian{" "}
                <span className="font-extrabold">Perawatan Motor</span>
              </p>
            </div>
          </div>

          {query.get("search") && isProducts.length === 0 ? (
            <div className="grid py-4 mt-2 place-items-center h-96">
              <div className="space-y-4 text-center">
                <p className="text-2xl font-black">Barang Tidak Di Temukan</p>
                <ButtonBlack
                  onClick={() => {
                    search = "";
                    getProducts();
                    router.push(ROUTES.PRODUCTS);
                    // router.reload();
                  }}
                >
                  Tampilkan Product
                </ButtonBlack>
              </div>
            </div>
          ) : (
            <div className="py-4 mt-2">
              <div className="grid flex-wrap justify-center max-w-6xl grid-cols-2 mx-auto gap-x-4 sm:gap-0 sm:flex xl:justify-start">
                {isLoading
                  ? [...Array(12)].map((_, i) => (
                      <ProductWidgetLoading key={i} />
                    ))
                  : isProducts &&
                    isProducts.map((item, idx) => {
                      return (
                        <ProductWidget
                          data={item}
                          key={idx}
                          className="xs:min-w-[11rem] w-full sm:max-w-[12rem]"
                        />
                      );
                    })}
              </div>
              <div>
                <p>
                  total {isProducts.length} dari {isPagination?.total} Product
                </p>
              </div>
              <div
                className={`flex justify-center py-2 mt-4 ${
                  (isPagination?.total || 0) < parseInt(isLimit) && "hidden"
                }`}
              >
                <Pagination
                  total_pages={isPagination?.total_pages || 0}
                  getIsPage={getIsPage}
                />
              </div>
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
};
