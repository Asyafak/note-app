import { Tag } from "../features/localStorage/localStorageSlice";

type TagsProps = {
  tags: Tag[];
  justify: string;
};

export default function Tags({ tags, justify }: TagsProps) {
  return (
    <ul className={`flex flex-wrap gap-2 justify-${justify}`}>
      {tags.map((tag) => (
        <li key={tag.id} className="text-sm rounded px-2 bg-sky-500 text-white">
          {tag.label.length > 9 ? tag.label.slice(0, 9) + "..." : tag.label}
        </li>
      ))}
    </ul>
  );
}
