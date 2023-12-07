import PropTypes from "prop-types";
import Image from "next/image";
import cn from "classnames";
import { useConfig } from "@/lib/config";
import useTheme from "@/lib/theme";
import FormattedDate from "@/components/FormattedDate";
import TagItem from "@/components/TagItem";
import NotionRenderer from "@/components/NotionRenderer";
import TableOfContents from "@/components/TableOfContents";

/**
 * A post renderer
 *
 * @param {PostProps} props
 *
 * @typedef {object} PostProps
 * @prop {object}   post       - Post metadata
 * @prop {object}   blockMap   - Post block data
 * @prop {string}   emailHash  - Author email hash (for Gravatar)
 * @prop {boolean} [fullWidth] - Whether in full-width mode
 */
export default function Post(props) {
  const BLOG = useConfig();
  const { post, blockMap, emailHash, fullWidth = false } = props;
  const { dark } = useTheme();

  return (
    <article
      className={cn("flex flex-col", fullWidth ? "md:px-24" : "items-center")}
    >
      <h1
        className={cn("w-full font-bold text-2xl text-black dark:text-white", {
          "max-w-2xl px-4": !fullWidth,
        })}
      >
        {post.title}
      </h1>
      {post.type[0] !== "Page" && (
        <nav
          className={cn(
            "w-full flex mt-2 items-start text-gray-700 dark:text-gray-400",
            { "max-w-2xl px-4": !fullWidth },
          )}
        >
          <div className="flex mb-4">
            <a href={BLOG.socialLink || "#"} className="flex">
              <Image
                alt={BLOG.author}
                width={20}
                height={20}
                src={`https://gravatar.com/avatar/${emailHash}`}
                className="rounded-full"
              />
              <p className="ml-2 text-sm font-semibold md:block">{BLOG.author}</p>
            </a>
          </div>
          <div className="ml-2 text-sm ">
            <FormattedDate date={post.date} />
          </div>
        </nav>
      )}
      <div className="self-stretch -mt-8 flex flex-col items-center lg:flex-row lg:items-stretch">
        {!fullWidth && <div className="flex-1 hidden lg:block" />}
        <div
          className={
            fullWidth ? "flex-1 pr-4" : "flex-none w-full max-w-2xl px-4"
          }
        >
          <NotionRenderer
            recordMap={blockMap}
            fullPage={false}
            darkMode={dark}
          />
        </div>
        <div
          className={cn(
            "order-first invisible lg:order-[unset] w-full lg:w-auto max-w-2xl lg:max-w-[unset] lg:min-w-[160px]",
            fullWidth ? "flex-none" : "flex-1",
          )}
        >
        </div>
      </div>
    </article>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  blockMap: PropTypes.object.isRequired,
  emailHash: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
};
