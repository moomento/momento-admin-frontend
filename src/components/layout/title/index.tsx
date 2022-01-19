import {
    useTranslate
} from "@pankod/refine";
import './style.scss';

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const t = useTranslate();
    return (
        <div className="logo">
            {collapsed ? (
                <span>{t("app.symbol")}</span>
            ) : (
                <span>{t("app.name")}</span>
            )}
        </div>
    );
};
