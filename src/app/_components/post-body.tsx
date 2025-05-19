import markdownStyles from "./markdown-styles.module.css";
import PostPhotos from "./post-photos"
type Props = {
  content: string;
  txtDirrection: string;
  albumURL:string;
};

export function PostBody({ content, txtDirrection, albumURL }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div dir={txtDirrection}
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
     {(albumURL) && <PostPhotos albumURL={albumURL}/>}
    </div>
  );
}
