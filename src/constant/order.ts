export const ORDER_STATUS = [
  { id: 1, key: "pending", name: "Menunggu Pembayaran" },
  { id: 2, key: "new", name: "Pesanan Baru" },
  { id: 3, key: "prepare", name: "diproses" },
  { id: 4, key: "shipping", name: "sedang dikirim" },
  { id: 5, key: "recieved", name: "Diterima" },
  { id: 6, key: "complaint", name: "komplain" },
  { id: 7, key: "completed", name: "selesai" },
  { id: 8, key: "canceled", name: "dibatalkan" },
];

export const ORDER_STATUS_COLOR = [
  "#F0E668", //pedding
  "#4455F0", //new
  "#B680F0", //prepare
  "#F0D58E", //shipping
  "#48F0A4", //recieved
  "#F09B5C", //complaint
  "#41F061", //completed
  "#F03A41", //canceled
];

export type TAlamat = {
  nama: string;
  noTelphon: string;
  alamatLengkap: string;
};

export type TOrder = {
  tglOrder: string;
  invoice: string;
  status: number;
  productName: string;
  variant: string;
  totalPrice: number;
  image: string;
  kurir: string;
  nomerResi: string;
  alamat: TAlamat;
  metodPembayaran: string;
  ongkosKirim: number;
  totalBill: number;
  totalBarang: number;
};

export const ORDER: TOrder[] = [
  {
    tglOrder: "17 Okt 2022",
    invoice: "INV12401332108508",
    status: 1,
    productName: "Automotive Shampoo",
    variant: "1 Liter",
    totalPrice: 30000,
    image: "/assets/images/product/product1.png",
    kurir: "JNT Reguler",
    nomerResi: "1318471984719410649",
    alamat: {
      nama: "Tresno Wicaksono",
      noTelphon: "08232911740",
      alamatLengkap:
        "Jl. Jenderal Sudirman No.17, Kepanjen Lor, Kec. Kepanjenkidul, Kota Blitar, Jawa Timur 66112",
    },
    metodPembayaran: "BCA Virtual Account",
    ongkosKirim: 12000,
    totalBill: 42000,
    totalBarang: 1,
  },
  {
    tglOrder: "14 Okt 2022",
    invoice: "INV12401332108510",
    status: 2,
    productName: "Automotive Shampoo",
    variant: "1 Liter",
    totalPrice: 35000,
    image: "/assets/images/product/product2.jpg",
    kurir: "JNT Reguler",
    nomerResi: "1318471984719410649",
    alamat: {
      nama: "Tresno Wicaksono",
      noTelphon: "08232911740",
      alamatLengkap:
        "Jl. Jenderal Sudirman No.17, Kepanjen Lor, Kec. Kepanjenkidul, Kota Blitar, Jawa Timur 66112",
    },
    metodPembayaran: "BCA Virtual Account",
    ongkosKirim: 12000,
    totalBill: 42000,
    totalBarang: 1,
  },
  {
    tglOrder: "14 Okt 2022",
    invoice: "INV12401332108519",
    status: 6,
    productName: "Automotive Shampoo",
    variant: "1 Liter",
    totalPrice: 50000,
    image: "/assets/images/product/product3.jpg",
    kurir: "JNT Reguler",
    nomerResi: "1318471984719410649",
    alamat: {
      nama: "Tresno Wicaksono",
      noTelphon: "08232911740",
      alamatLengkap:
        "Jl. Jenderal Sudirman No.17, Kepanjen Lor, Kec. Kepanjenkidul, Kota Blitar, Jawa Timur 66112",
    },
    metodPembayaran: "BCA Virtual Account",
    ongkosKirim: 20000,
    totalBill: 42000,
    totalBarang: 1,
  },
  {
    tglOrder: "14 Okt 2022",
    invoice: "INV12401332108519",
    status: 3,
    productName: "Automotive Shampoo",
    variant: "1 Liter",
    totalPrice: 50000,
    image: "/assets/images/product/product3.jpg",
    kurir: "JNT Reguler",
    nomerResi: "1318471984719410649",
    alamat: {
      nama: "Tresno Wicaksono",
      noTelphon: "08232911740",
      alamatLengkap:
        "Jl. Jenderal Sudirman No.17, Kepanjen Lor, Kec. Kepanjenkidul, Kota Blitar, Jawa Timur 66112",
    },
    metodPembayaran: "BCA Virtual Account",
    ongkosKirim: 20000,
    totalBill: 42000,
    totalBarang: 1,
  },
];
