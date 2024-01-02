import React from "react";
import {
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

export const MenuSidebarDown = () => {
  return (
    <div className="flex items-center justify-center gap-8 p-4 px-4 bg-white border-t border-brand-muted text-brand-muted dark:bg-dark-components dark:text-white xs:py-8">
      <button>
        <BsFacebook />
      </button>
      <button>
        <AiOutlineTwitter />
      </button>
      <button>
        <AiFillYoutube />
      </button>
      <button>
        <AiOutlineInstagram />
      </button>
    </div>
  );
};
