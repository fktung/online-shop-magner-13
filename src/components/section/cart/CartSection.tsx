import { ButtonBlack } from "@/components/button";
import { Card } from "@/components/card";
import { ModalCartItem } from "@/components/modal";
import { Image } from "@/components/utility";
import { ROUTES } from "@/constant/routes";
import { ApiAxios } from "@/helpers/axios";
import { MoneyFormat } from "@/helpers/common";
import { useLayout } from "@/hooks/layouts";
import { useUser } from "@/hooks/user";
import { IItemCart } from "@/types";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineRight } from "react-icons/ai";
import Swal from "sweetalert2";

interface IPropsCartSection {
  data: IItemCart[];
  getItemsCart: () => void;
}

export const CartSection = (props: IPropsCartSection) => {
  const { data, getItemsCart } = props;
  const { getCountCart } = useUser();
  const { setIsError, setIsMessage } = useLayout();
  const [isAmount, setIsAmount] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCheckItem = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    setIsLoading(true);
    try {
      await ApiAxios.patch(`/carts/${id}`, {
        is_checked: e.target.checked,
      });
      getItemsCart();
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsError(true);
      setIsMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  const handleQty = async (id: number, n: number, row?: number) => {
    setIsLoading(true);
    if (data[row as number].flash_sale) {
      const stockFlashSale = data[row as number].flash_sale?.margin_stock;
      if (stockFlashSale && n > stockFlashSale) {
        setIsError(true);
        setIsMessage(`Stock Flash Sale Hanya ${stockFlashSale}`);
        setIsLoading(false);
        return;
      }
    }
    if (data[row as number] && n > data[row as number].stock) {
      setIsError(true);
      setIsMessage("Stock tidak cukup");
      setIsLoading(false);
      return;
    }
    try {
      if (n <= 0) {
        Swal.fire({
          title: "Apakah Anda yakin?",
          text: "Item ini akan di hapus dari keranjang!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(result => {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            deleteItem(id);
          }
        });
        setIsLoading(false);
        return;
      }
      await ApiAxios.patch(`/carts/${id}`, {
        qty: n,
      });
      getItemsCart();
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsError(true);
      setIsMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  useMemo(() => {
    const arr: number[] = [];
    let check = data[0]?.is_checked === 1;
    data.map(item => {
      arr.push(item.is_checked);
    });
    if (data.length > 1) {
      check = arr.every(value => value === arr[0]);
      if (data[0]?.is_checked !== 1) {
        setIsChecked(false);
        return;
      }
    }
    setIsChecked(check);
  }, [data]);

  const toggleCheckedItems = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    try {
      await ApiAxios.patch(`/carts/toggle`);
      getItemsCart();
    } catch (error: any) {
      console.log("toggleCheckedItems", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCheckItems = async () => {
    setIsLoading(true);
    try {
      await ApiAxios.delete(`/carts/selected`);
      getItemsCart();
      getCountCart();
    } catch (error: any) {
      console.log("deleteCheckItems", error);
      setIsError(true);
      setIsMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await ApiAxios.delete(`/carts/${id}`);
      getItemsCart();
      getCountCart();
    } catch (error: any) {
      console.log("deleteItem", error);
      setIsError(true);
      setIsMessage(error.response.data.message);
    }
  };

  const handleBtnDelete = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Item ini akan di hapus dari keranjang!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        deleteCheckItems();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="relative w-full">
      {isLoading && <div className="absolute top-0 bottom-0 left-0 right-0" />}
      <Card variant="border" className="w-full">
        <div className="grid gap-4">
          <div className="pt-2 space-y-2">
            <p className="text-xl font-extrabold">Keranjang</p>
          </div>
          {data.length === 0 ? (
            <div className="flex flex-col items-center gap-8 py-8">
              <p className="text-3xl font-extrabold">Keranjang Kosong</p>
              <Link href={ROUTES.PRODUCTS}>
                <ButtonBlack>
                  <p>Kembali Ke Produk</p>
                </ButtonBlack>
              </Link>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between py-4">
                <label className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-warning"
                    checked={isChecked}
                    onChange={toggleCheckedItems}
                  />
                  <span className="font-bold">Semua</span>
                </label>
                <button
                  className="font-bold text-red-500"
                  onClick={handleBtnDelete}
                >
                  Hapus
                </button>
              </div>
              {data.map((item, idx) => (
                <div key={idx}>
                  <div className="flex gap-4 py-6 border-t">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-warning"
                      checked={item.is_checked === 1}
                      onChange={e => handleCheckItem(e, item.id)}
                    />
                    <div className="items-center justify-between w-full gap-2 md:flex">
                      <div className="flex items-center gap-2 max-w-max">
                        <div className="w-24 h-24 p-2 mx-auto border rounded-lg">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_URL_CDN}${
                              item.img
                                ? "/" + item.img.replace(/"/g, "")
                                : "/asset/noProfile.png"
                            }`}
                            alt={item.name}
                            className="h-full mx-auto"
                          />
                        </div>
                        <div>
                          <p className="font-bold opacity-90">
                            {item.name.split(" - ")[0]}
                          </p>
                          <p className="opacity-75">
                            {item.name.split(" - ")[1]}
                          </p>
                          {item.flash_sale ? (
                            <div className="items-end gap-2 xs:flex">
                              <p className="mb-0.5 text-xs font-black line-through opacity-80">
                                {MoneyFormat(item.flash_sale.price)}
                              </p>
                              <p className="text-lg font-black">
                                {MoneyFormat(item.flash_sale.discount_price)}
                              </p>
                            </div>
                          ) : (
                            <p className="text-lg font-bold">
                              {MoneyFormat(item.price)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="pt-2 ml-auto space-y-2 max-w-max">
                        <p className="font-bold opacity-90 text-end">
                          Total Barang
                        </p>
                        <div className="flex items-center justify-center gap-6 font-bold bg-gray-100 rounded-lg dark:bg-dark-components">
                          <button
                            disabled={isAmount < 1 ? true : false}
                            type="button"
                            className={`btn btn-ghost btn-sm ${
                              isAmount < 1 && "cursor-not-allowed"
                            }`}
                            onClick={() =>
                              handleQty(item.id, item.qty - 1, idx)
                            }
                          >
                            <AiOutlineMinus className="mx-auto text-sm" />
                          </button>
                          <p>{item.qty}</p>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => {
                              handleQty(item.id, item.qty + 1, idx);
                            }}
                          >
                            <AiOutlinePlus className="mx-auto text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-1 px-11">
                    {item.note ? (
                      <div className="flex items-center gap-4">
                        <p className="text-sm opacity-75">
                          Catatan : {item.note}
                        </p>
                        <label
                          htmlFor={item.slug + item.id}
                          className="transition-all duration-300 cursor-pointer text-brand hover:text-yellow-500"
                        >
                          Ubah
                        </label>
                      </div>
                    ) : (
                      <label
                        htmlFor={item.slug + item.id}
                        className="transition-all duration-300 cursor-pointer text-brand hover:text-yellow-500"
                      >
                        Tambah Catatan
                      </label>
                    )}
                  </div>
                  <ModalCartItem data={item} getItem={getItemsCart} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
