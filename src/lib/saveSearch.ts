import { IProducts, TSearchStore } from "@/types";

const saveSearchResults = (product: IProducts[]) => {
  let dataSearch: TSearchStore[] = [];
  const getSearchResults = localStorage.getItem("search-results");
  if (getSearchResults) {
    dataSearch = JSON.parse(getSearchResults);
  } else {
    localStorage.setItem("search-results", JSON.stringify([]));
  }
  product.map(item => {
    const match = dataSearch.find(el => el.slug === item.slug);
    const dataItem = {
      slug: item.slug,
      name: item.name,
    };
    if (!match) {
      dataSearch.push(dataItem);
    }
  });
  localStorage.setItem("search-results", JSON.stringify(dataSearch));
};

export default saveSearchResults;
