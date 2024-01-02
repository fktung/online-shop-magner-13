import { ApiAxios } from "@/helpers/axios";
import { MoneyFormat } from "@/helpers/common";
import {
  IMembershipOrders,
  IMembershipReferralGlobal,
  IPagination,
} from "@/types";
import React, { FormEvent, useEffect, useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import InitialsAvatar from "react-initials-avatar";
import {
  FaSortAmountDownAlt,
  FaSortAmountUpAlt,
  FaSearch,
} from "react-icons/fa";
import MembershipOrders from "./MembershipOrders";
import { Pagination } from "@/components/pagination";
import { InputForm } from "@/components/input";
import { LoadingLoadData } from "@/components/loading";
import { MembershipFollowerSummary } from "./MembershipFollowerSummary";

export const MembershipFollower = ({ loadData }: { loadData: boolean }) => {
  const [isNameClicked, setIsNameClicked] = useState<boolean>(false);
  const [isUserSelect, setIsUserSelect] = useState<string>();
  const [isCurrentPage, setCurrentPage] = useState<string>("1");
  const [currentPageOrder, setCurrentPageOrder] = useState<string>("1");
  const [orders, setOrders] = useState<IMembershipOrders[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPagination, setIsPagination] = useState<IPagination>();
  const [isPaginationOrder, setIsPaginationOrder] = useState<IPagination>();
  const [isKeyName, setIsKeyName] = useState<string>("");
  const [isOrderBy, setIsOrderBy] = useState<{ by: string; sort?: string }>();
  const [isLevelSort, setIsLevelSort] = useState<"ASC" | "DESC">("ASC");

  const [isMembershipReferralGlobal, setIsMembershipReferralGlobal] = useState<
    IMembershipReferralGlobal[]
  >([]);

  const getMembershipReferralGlobal = async (
    page: string = isCurrentPage,
    ob?: typeof isOrderBy,
    key?: string,
  ) => {
    let orderBy = "";
    if (ob) {
      orderBy = `&ob=${ob.by}${ob.sort && "&sort=" + ob.sort}`;
    }
    const keyword = key === "" ? "" : `&keyword=${isKeyName}`;
    setIsLoading(true);
    try {
      const response = await ApiAxios.get(
        `/membership/referrals/v2?page=${page}&limit=10${orderBy}${keyword}`,
      );
      const data = response.data;
      setIsMembershipReferralGlobal(data.data);
      setIsPagination(data.metadata);
      setCurrentPage(data.metadata.current_page);
      setIsLoading(false);
    } catch (error: any) {
      console.log("getMembershipSummary", error);
      setIsLoading(false);
    }
  };

  async function getUserOrder(
    user_id: string,
    page: string = currentPageOrder,
  ) {
    try {
      const response = await ApiAxios.get(
        `/order/${user_id}/get-all?page=${page}&limit=10`,
      );
      setOrders(response.data.data);
      setIsPaginationOrder(response.data.metadata);
    } catch (error) {
      console.log("getUserOrder", error);
    }
  }

  function handleClickName(user_id: string) {
    setIsNameClicked(true);
    setIsUserSelect(user_id);
    getUserOrder(user_id);
  }

  function handleClickBack() {
    setIsNameClicked(false);
    setOrders([]);
  }

  useEffect(() => {
    if (loadData) {
      getMembershipReferralGlobal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadData]);

  const getIsPage = (cur: string) => {
    setCurrentPage(cur);
    getMembershipReferralGlobal(cur, isOrderBy);
  };
  const getIsPageOrder = (cur: string) => {
    setCurrentPageOrder(cur);
    isUserSelect && getUserOrder(isUserSelect, cur);
  };

  function orderBy(ob: string) {
    let orderBy: typeof isOrderBy;
    let sort = "";
    if (isLevelSort === "DESC") {
      sort = "ASC";
      setIsLevelSort("ASC");
    } else {
      sort = "DESC";
      setIsLevelSort("DESC");
    }
    if (ob === "level") {
      if (ob !== isOrderBy?.by) sort = "DESC";
      orderBy = { by: ob, sort: sort };
    }
    if (ob === "order_item_qty") {
      if (ob !== isOrderBy?.by) sort = "DESC";
      orderBy = { by: ob, sort: sort };
    }
    if (ob === "order_amount") {
      if (ob !== isOrderBy?.by) sort = "DESC";
      orderBy = { by: ob, sort: sort };
    }
    setIsOrderBy(orderBy);
    getMembershipReferralGlobal(isCurrentPage, orderBy);
  }

  function handleSearchName(e: FormEvent) {
    e.preventDefault();
    getMembershipReferralGlobal("1", isOrderBy);
  }

  function resetFilterAll() {
    const currenPage = "1";
    setCurrentPage(currenPage);
    setIsOrderBy(undefined);
    setIsKeyName("");
    getMembershipReferralGlobal("1", undefined, "");
  }

  return (
    <div className="relative w-full my-6 rounded-xl">
      {isNameClicked ? (
        <div className="min-h-[300px] border shadow-md relative p-4 pt-12 overflow-hidden overflow-x-auto">
          <div
            className="absolute top-4 left-4 hover:cursor-pointer"
            onClick={handleClickBack}
          >
            <BsArrowLeftCircle className="text-2xl" />
          </div>
          <MembershipOrders orders={orders} />
          <div className="flex justify-center my-4">
            <Pagination
              total_pages={isPaginationOrder?.total_pages || 0}
              getIsPage={getIsPageOrder}
            />
          </div>
        </div>
      ) : (
        <div className="relative grid gap-4">
          {isLoading && (
            <div className="absolute top-0 bottom-0 left-0 right-0 grid place-items-center">
              <LoadingLoadData />
            </div>
          )}
          <div className="max-w-[90vw] w-full sm:max-w-full overflow-hidden overflow-x-auto no-scrollbar mx-auto">
            <div className="flex items-center gap-4 px-2 sm:justify-between">
              <form
                onSubmit={handleSearchName}
                className="flex items-center gap-2"
              >
                <label className="font-bold">Search Name: </label>
                <InputForm
                  name="SearchName"
                  onChange={e => setIsKeyName(e.target.value)}
                  value={isKeyName}
                  type="text"
                  placeholder="Search Name"
                  className="input-xs"
                >
                  <button className="absolute top-0 bottom-0 right-0 px-2">
                    <FaSearch />
                  </button>
                </InputForm>
              </form>
              <button
                className="text-brand hover:text-orange-500 active:scale-90"
                onClick={resetFilterAll}
              >
                Reset
              </button>
            </div>
            <table className="w-full text-sm text-left text-brand-muted dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-dark-components">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => orderBy("level")}
                    >
                      Level{" "}
                      {isOrderBy?.by === "level" ? (
                        isOrderBy.sort === "DESC" ? (
                          <FaSortAmountUpAlt />
                        ) : (
                          <FaSortAmountDownAlt />
                        )
                      ) : null}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => orderBy("order_item_qty")}
                    >
                      Item Beli{" "}
                      {isOrderBy?.by === "order_item_qty" ? (
                        isOrderBy.sort === "DESC" ? (
                          <FaSortAmountUpAlt />
                        ) : (
                          <FaSortAmountDownAlt />
                        )
                      ) : null}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <button
                      className="flex items-center gap-1 min-w-max"
                      onClick={() => orderBy("order_amount")}
                    >
                      Total Order Dari Member{" "}
                      {isOrderBy?.by === "order_amount" ? (
                        isOrderBy.sort === "DESC" ? (
                          <FaSortAmountUpAlt />
                        ) : (
                          <FaSortAmountDownAlt />
                        )
                      ) : null}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isMembershipReferralGlobal?.map((row, idx) => (
                  <tr className="border-b dark:border-gray-700" key={idx}>
                    <th
                      scope="row"
                      className="flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap"
                    >
                      <div className="overflow-hidden rounded-full min-w-max">
                        <InitialsAvatar
                          name={row.name}
                          className="flex items-center justify-center w-10 h-10 border-2 border-black rounded-full"
                        />
                      </div>
                      <p
                        className="grid text-sm hover:cursor-pointer hover:underline hover:text-blue-800"
                        onClick={() => handleClickName(row.user_id)}
                      >
                        <span>{row.name}</span>
                      </p>
                    </th>
                    <td className="px-6 py-4">{row.level}</td>
                    <td className="px-6 py-4">{row.order_item_qty}</td>
                    <td className="px-6 py-4">
                      {MoneyFormat(parseInt(row.order_amount))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isMembershipReferralGlobal &&
              isMembershipReferralGlobal?.length < 1 && (
                <div className="flex items-center justify-center h-56">
                  <p className="text-2xl font-bold">Pengikut Tidak Ditemukan</p>
                </div>
              )}
          </div>
          <div className="flex justify-center mx-auto scale-75">
            <Pagination
              total_pages={isPagination?.total_pages || 0}
              getIsPage={getIsPage}
              currenPage={+isCurrentPage}
            />
          </div>
          {loadData && <MembershipFollowerSummary />}
        </div>
      )}
    </div>
  );
};
