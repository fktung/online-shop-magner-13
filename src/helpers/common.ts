import { MONTHS } from "@/constant/common";

export const Capitalize = (text: string = "") => {
  const arr = text.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};

export const MoneyFormat = (num: number) => {
  var rupiah = "";
  var angkarev = num.toString().split("").reverse().join("");
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
  return (
    "Rp " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
};

export const CensorCommission = (komisi: string) => {
  const nominal = komisi.replace("Rp ", "");
  const nominalArry = nominal.split(".");
  const result: string[] = [];
  nominalArry.map((no, idx) => {
    if (idx === 0) {
      const firstDigit = no.split("");
      if (firstDigit.length > 0) {
        const digitArry: string[] = [];
        firstDigit.map((n, i) => {
          if (i > 0) {
            digitArry.push("x");
            return;
          }
          digitArry.push(n);
        });
        result.push(digitArry.join(""));
      }
    } else {
      result.push("xxx");
    }
  });
  return `Rp ${result.join(".")}`;
};

export const FormatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", options);
};

export interface ICountdownTimer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CalculateCountdown = (endDate: Date): ICountdownTimer => {
  const currentTime = new Date().getTime();
  const targetTime = endDate.getTime();

  const difference = targetTime - currentTime;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export const EstimateDelivery = (
  inputDate: string,
  daysToMin: number,
  daysToMax: number
) => {
  const dateObject = new Date(inputDate);

  // Tambahkan 2 hari
  dateObject.setDate(dateObject.getDate() + daysToMax);
  let minDay = "";
  const tanggal = dateObject.getDate();
  const bulan = dateObject.getMonth();
  const tahun = dateObject.getFullYear();
  if (daysToMin !== daysToMax) {
    const minDateObject = new Date(inputDate);
    minDateObject.setDate(minDateObject.getDate() + daysToMin);
    if (minDateObject.getFullYear() !== tahun) {
      minDay = `${minDateObject.getDate()} ${
        MONTHS[minDateObject.getMonth()]
      } ${minDateObject.getFullYear()} -`;
    } else if (minDateObject.getMonth() !== bulan) {
      minDay = `${minDateObject.getDate()} ${
        MONTHS[minDateObject.getMonth()]
      } - `;
    } else {
      minDay = dateObject.getDate() - (daysToMax - daysToMin) + " -";
    }
  }
  const monthName = MONTHS[bulan];
  const dateIndonesia = `${minDay} ${tanggal} ${monthName} ${tahun}`;

  return dateIndonesia;
};

export const DateFormatFull = (inputDate: string) => {
  // Ubah string tanggal menjadi objek Date
  const dateObject = new Date(inputDate);

  // Dapatkan tanggal, bulan, dan tahun dari objek Date
  const tanggal = dateObject.getDate();
  const bulan = dateObject.getMonth();
  const tahun = dateObject.getFullYear();

  // Dapatkan jam dan menit dari objek Date
  const jam = dateObject.getHours();
  const menit = dateObject.getMinutes();

  // Ubah angka bulan menjadi nama bulan dalam bahasa Indonesia
  const namaBulanIndonesia = MONTHS[bulan];

  // Buat string tanggal dengan format "tanggal bulan tahun, jam:menit WIB"
  const tanggalIndonesia = `${tanggal} ${namaBulanIndonesia} ${tahun}, ${jam
    .toString()
    .padStart(2, "0")}:${menit.toString().padStart(2, "0")} WIB`;

  return tanggalIndonesia;
};

export const FormatNumber = (number: number) => {
  return number.toLocaleString("id-ID");
};

export const CensorName = (name: string) => {
  if (name.length <= 3) {
    return name;
  }

  const firstLetters = name.slice(0, 3);
  const lastLetters = name.slice(-3);

  const censored = firstLetters + "*".repeat(name.length - 6) + lastLetters;
  return censored;
};

export const SeasonRange = (dateStart: string, dateEnd: string) => {
  const start = new Date(dateStart);
  const end = new Date(dateEnd);

  const startData = start.getDate();
  const startMonth = start.getMonth();
  const startYear = start.getFullYear();
  const endData = end.getDate();
  const endMonth = end.getMonth();
  const endYear = end.getFullYear();

  const arrDate = [];
  if (startYear === endYear) {
    arrDate.push(`${startData} ${MONTHS[startMonth]}`);
  } else {
    arrDate.push(`${startData} ${MONTHS[startMonth]} ${startYear}`);
  }
  arrDate.push(`${endData} ${MONTHS[endMonth]} ${endYear}`);

  return arrDate.join(" - ");
};
