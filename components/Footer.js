import { useConfig } from "@/lib/config";
import Vercel from "@/components/Vercel";
const Footer = ({ fullWidth }) => {
  const BLOG = useConfig();

  const d = new Date();
  const y = d.getFullYear();
  const from = +BLOG.since;
  return (
    <div
      className={`mt-6 flex-shrink-0 m-auto w-full dark:text-white  transition-all ${
        !fullWidth ? "max-w-2xl px-4" : "px-4 md:px-24"
      }`}
    >
      <hr className="border-black border-opacity-10 dark:border-white dark:border-opacity-50" />
      <div className="my-4 text-sm leading-6">
        <div className="flex align-baseline justify-between flex-wrap">
          <p>
            © {BLOG.author} {from === y || !from ? y : `${from} - ${y}`}
          </p>
          <Vercel />
        </div>
      </div>
    </div>
  );
};

export default Footer;
