import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
  txtDirrection: string;
};

export function PostBody({ content, txtDirrection }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div dir={txtDirrection}
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
