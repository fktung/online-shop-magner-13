import Image from "next/image";

export const SendIcon = ({
  color = "#02B290",
  width = "20",
  height = "20",
  className = "",
}) => {
  return (
    <>
      <Image
        src="/assets/icons/sendEmail.png"
        alt="Next.js Logo"
        width={20}
        height={20}
      />
    </>
  );
};
