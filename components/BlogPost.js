import FormattedDate from "@/components/FormattedDate";
import { useConfig } from "@/lib/config";
import Link from "next/link";

const BlogPost = ({ post }) => {
  const BLOG = useConfig();

  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <article key={post.id} className="mb-2 md:mb-5">
        <header className="flex flex-col justify-between md:items-baseline">
          <h2 className="text-lg md:text-xl font-medium  cursor-pointer text-black dark:text-gray-100">
            {post.title}
          </h2>
         <p className="flex">{post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-stone-200 bg-opacity-80 dark:bg-gray-800  rounded-md px-1 py-[2px]  text-[10px] font-semibold text-gray-700 dark:text-gray-300 mb-1 mr-2"
            >
              {tag}
            </span>
          ))}</p>

          <time className="flex-shrink-0  text-xs text-gray-500 dark:text-gray-400">
            <FormattedDate date={post.date} />
          </time>
        </header>
      </article>
    </Link>
  );
};

export default BlogPost;
