
import classNames from "classnames/bind";
import styles from "./ChatPreView.module.scss";

const cx = classNames.bind(styles);

function ChatPreview({ imageUrl, onClose }) {
  return (
    <div className={cx("image-preview")} onClick={onClose}>
      <img src={imageUrl} alt="preview" />
    </div>
  );
}

export default ChatPreview;