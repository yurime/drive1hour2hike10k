import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
  direction: string;
};

export function PostBody({ content, direction }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div dir={direction}
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
