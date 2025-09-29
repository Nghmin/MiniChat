
import classNames from "classnames/bind";
import styles from "./Content4.module.scss";

const cx  = classNames.bind(styles);

function Content4() {
    return (
        <div className={cx('content1')}>
            {/* Header Title - Fixed */}
            <div className={cx('header-fixed')}>
                <div className={cx('header-title')}>
                    <svg className={cx('icon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75H21l-3.228-3.228z" />
                    </svg>
                    <span className={cx('title-text')}>Lời mời vào nhóm và cộng đồng</span>
                </div>
            </div>

            <div className={cx("content-body")}>
                <p className={cx("developing-text")}>Chức năng đang phát triển</p>
            </div>
        </div>
    );
}

export default Content4;