import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useConfig } from "@/lib/config";
import { useLocale } from "@/lib/locale";
import useTheme from "@/lib/theme";

const NavBar = () => {
  const BLOG = useConfig();
  const locale = useLocale();
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || "/", show: true },
    {
      id: 1,
      name: 'about',
      to: "https://buycoffee.top",
      show: true,
    },
  ];
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          (link) =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black font-medium dark:text-gray-50 nav"
                style={{ display: "flex", alignItems: "center" }} // 让文本和绿点垂直居中
              >
                <Link href={link.to} target={link.external ? "_blank" : null}>
                  {link.name}
                </Link>
                {link.id === 0 && (<span
                  className="h-2 w-2 bg-yellow-500 rounded-full ml-1" // 绿点样式
                ></span>)}


              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default function Header({ navBarTitle, fullWidth }) {
  const BLOG = useConfig();
  const { dark } = useTheme();

  // Favicon

  const resolveFavicon = (fallback) =>
    !fallback && dark ? "/favicon.dark.png" : "/favicon.png";
  const [favicon, _setFavicon] = useState(resolveFavicon());
  const setFavicon = (fallback) => _setFavicon(resolveFavicon(fallback));

  useEffect(
    () => setFavicon(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dark],
  );

  // const useSticky = !BLOG.autoCollapsedNavBar
  const useSticky = false;
  const navRef = useRef(/** @type {HTMLDivElement} */ undefined);
  const sentinelRef = useRef(/** @type {HTMLDivElement} */ undefined);
  const handler = useCallback(
    ([entry]) => {
      if (useSticky && navRef.current) {
        navRef.current?.classList.toggle(
          "sticky-nav-full",
          !entry.isIntersecting,
        );
      } else {
        navRef.current?.classList.add("remove-sticky");
      }
    },
    [useSticky],
  );

  useEffect(() => {
    const sentinelEl = sentinelRef.current;
    const observer = new window.IntersectionObserver(handler);
    observer.observe(sentinelEl);

    return () => {
      sentinelEl && observer.unobserve(sentinelEl);
    };
  }, [handler, sentinelRef]);

  const titleRef = useRef(/** @type {HTMLParagraphElement} */ undefined);

  function handleClickHeader(/** @type {MouseEvent} */ ev) {
    if (![navRef.current, titleRef.current].includes(ev.target)) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinelRef}></div>
      <div
        className={`sticky-nav group m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? "max-w-2xl" : "px-4 md:px-24"
        }`}
        id="sticky-nav"
        ref={navRef}
        onClick={handleClickHeader}
      >
        <NavBar />
      </div>
    </>
  );
}

const HeaderName = forwardRef(function HeaderName(
  { siteTitle, siteDescription, postTitle, onClick },
  ref,
) {
  return (
    <p
      ref={ref}
      className="header-name ml-2 font-medium text-gray-600 dark:text-gray-300 capture-pointer-events grid-rows-1 grid-cols-1 items-center"
      onClick={onClick}
    >
      {postTitle && (
        <span className="post-title row-start-1 col-start-1">{postTitle}</span>
      )}
      <span className="row-start-1 col-start-1">
        <span className="site-title">{siteTitle}</span>
        <span className="site-description font-normal">
          , {siteDescription}
        </span>
      </span>
    </p>
  );
});
