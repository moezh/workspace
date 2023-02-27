import {useState, useEffect} from "react";
import Link from "next/link";
import Logo from "./Logo";

const Menu = (props: {menu: Record<string, string[]>; url: string;}) => {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;

    return (
        <>
            {isVisible === true ?
                <div className="fixed inset-0 backdrop-blur-sm bg-gray-500/30">
                    <div className="flex flex-row items-start justify-start w-full h-screen">
                        <div className="bg-white dark:bg-black w-[290px] min-w-[290px] h-full flex flex-col items-start justify-start overflow-x-hidden overflow-y-visible">
                            <div className="p-4"><Logo /></div>
                            {props.menu["Root"]?.map((level0) => (
                                <div key={level0} className="w-[290px] px-4">
                                    <div className="py-4 uppercase">
                                        {level0.slice(-1) === "→" ? (
                                            <Link
                                                onClick={handleClick}
                                                href={`${props.url}${level0.replaceAll(/[^A-Za-z0-9]+/g, "")}`}
                                            >
                                                <>{level0}</>
                                            </Link>
                                        ) : (
                                            <>{level0}</>
                                        )}
                                    </div>
                                    {props.menu[`${level0.replace(" →", "")}`]?.map((level1) => (
                                        <div key={level1}>
                                            <div
                                                className="py-4 pl-2"
                                                hidden={level1.slice(-1) === "→" ? false : true}
                                            >
                                                {level1.slice(-1) === "→" ? (
                                                    <Link
                                                        onClick={handleClick}
                                                        href={`${props.url}${level1.replaceAll(
                                                            /[^A-Za-z0-9]+/g,
                                                            ""
                                                        )}`}
                                                    >
                                                        <>{level1}</>
                                                    </Link>
                                                ) : (
                                                    <>{level1}</>
                                                )}
                                            </div>
                                            {props.menu[`${level1.replace(" →", "")}`]?.map(
                                                (level2) => (
                                                    <div key={level2}>
                                                        <div
                                                            className="py-4 pl-4"
                                                            hidden={level2.slice(-1) === "→" ? false : true}
                                                        >
                                                            {level2.slice(-1) === "→" ? (
                                                                <Link
                                                                    onClick={handleClick}
                                                                    href={`${props.url}${level2.replaceAll(
                                                                        /[^A-Za-z0-9]+/g,
                                                                        ""
                                                                    )}`}
                                                                >
                                                                    <>{level2}</>
                                                                </Link>
                                                            ) : (
                                                                <>{level2}</>
                                                            )}
                                                        </div>
                                                        {props.menu[`${level2.replace(" →", "")}`]?.map(
                                                            (level3) => (
                                                                <div key={level3}>
                                                                    <div
                                                                        className="py-4 pl-6"
                                                                        hidden={level3.slice(-1) === "→" ? false : true}
                                                                    >
                                                                        {level3.slice(-1) === "→" ? (
                                                                            <Link
                                                                                onClick={handleClick}
                                                                                href={`${props.url}${level3.replaceAll(
                                                                                    /[^A-Za-z0-9]+/g,
                                                                                    ""
                                                                                )}`}
                                                                            >
                                                                                <>{level3}</>
                                                                            </Link>
                                                                        ) : (
                                                                            <>{level3}</>
                                                                        )}
                                                                    </div>
                                                                    {props.menu[
                                                                        `${level3.replace(" →", "")}`
                                                                    ]?.map((level4) => (
                                                                        <div key={level4}>
                                                                            <div
                                                                                className="py-4 pl-8"
                                                                                hidden={
                                                                                    level4.slice(-1) === "→" ? false : true
                                                                                }
                                                                            >
                                                                                {level4.slice(-1) === "→" ? (
                                                                                    <Link
                                                                                        onClick={handleClick}
                                                                                        href={`${props.url}${level4.replaceAll(
                                                                                            /[^A-Za-z0-9]+/g,
                                                                                            ""
                                                                                        )}`}
                                                                                    >
                                                                                        <>{level4}</>
                                                                                    </Link>
                                                                                ) : (
                                                                                    <>{level4}</>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div onClick={handleClick} className="w-full h-full">
                            <button className="fixed top-0 right-0 p-4">
                                <svg
                                    className="h-7 w-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div >
                :
                <button onClick={handleClick}>
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button >
            }
        </>
    );
};

export default Menu;
