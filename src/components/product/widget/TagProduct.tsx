import { IconTags } from "@/components/icons";
import { ROUTES } from "@/constant/routes";
import { IProductDetailDescription } from "@/types";
import { useRouter } from "next/router";

interface ITagProductProps {
  data: IProductDetailDescription;
}

export const TagProduct = (props: ITagProductProps) => {
  const { data } = props;
  const router = useRouter();

  const getProductByTag = (tag: string) => {
    router.push(`${ROUTES.PRODUCTS}?${tag}`);
  };
  return (
    <div className="flex items-start gap-3 opacity-70">
      <p className="flex items-center gap-1 py-1 min-w-max">
        <span>
          <IconTags />
        </span>
        Tags
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => getProductByTag(`ct=${data.category.id}`)}
          className="px-4 py-1 border rounded-lg"
        >
          {data.category.name}
        </button>
        <button
          onClick={() => getProductByTag(`sct=${data.sub_category.id}`)}
          className="px-4 py-1 border rounded-lg"
        >
          {data.sub_category.name}
        </button>
        <button
          onClick={() => getProductByTag(`ssct=${data.sub_sub_category.id}`)}
          className="px-4 py-1 border rounded-lg"
        >
          {data.sub_sub_category.name}
        </button>
      </div>
    </div>
  );
};
