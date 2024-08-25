import { motion, useMotionValue, useSpring, useTransform, Reorder } from "framer-motion";
import { useRef, useState } from "react";
import ReactIcon from "../assets/react.svg";
import TailwindCSSIcon from "../assets/tailwindcss.svg";
import JavaScriptIcon from "../assets/javascript.svg";
import NpmIcon from "../assets/npm.svg";
import FramerMotionIcon from "../assets/framermotion.svg";
import ExpressJSIcon from "../assets/expressjs.svg";
import GitHubIcon from "../assets/github.svg";
import FigmaIcon from "../assets/figma.svg";
import HTML5Icon from "../assets/html5.svg";
import VSCodeIcon from "../assets/vscode.svg";
import { ArrowsRightLeftIcon, ChevronRightIcon, MagnifyingGlassPlusIcon, Squares2X2Icon } from '@heroicons/react/24/solid'

function Dock() {
    const [apps, setApps] = useState([
        { name: "HTML5", icon: HTML5Icon, bg: "#ffffff", bounce: false },
        { name: "JavaScript", icon: JavaScriptIcon, bg: "#F7DF1E", bounce: false },
        { name: "React", icon: ReactIcon, bg: "#23272f", bounce: false },
        { name: "Tailwind CSS", icon: TailwindCSSIcon, bg: "#0b1120", bounce: false },
        { name: "Framer Motion", icon: FramerMotionIcon, bg: "#f649a7", bounce: false },
        { name: "Express.js", icon: ExpressJSIcon, bg: "#fdfdfd", bounce: false },
        { name: "GitHub", icon: GitHubIcon, bg: "#ffffff", bounce: false },
        { name: "Visual Studio Code", icon: VSCodeIcon, bg: "#FFFFFF", bounce: true },
        { name: "Figma", icon: FigmaIcon, bg: "#ffffff", bounce: false },
        { name: "npm", icon: NpmIcon, bg: "#C53635", bounce: false },
    ]);

    const [isMagnified, setIsMagnified] = useState(false);
    const [isOption, setIsOption] = useState(false);
    const [magnifiedEvent, setMagnifiedEvent] = useState(false);
    const [optionAxis, setOptionAxis] = useState(0);
    const [subOption, setSubOption] = useState(false);
    const [reorder, setReorder] = useState(false);
    const [shape, setShape] = useState("");

    let optionRef = useRef(null);

    let mouseX = useMotionValue(Infinity);

    const handleOptions = (e) => {
        e.preventDefault();
        setIsOption(!isOption);
        setOptionAxis(e.pageX);
        setMagnifiedEvent(!magnifiedEvent);
    };

    const handleClickOutside = (e) => {
        if (optionRef.current && !optionRef.current.contains(e.target)) {
            setIsOption(false);
            setMagnifiedEvent(false);
        }

        if (reorder && reorderRef.current && !reorderRef.current.contains(e.target)) {
            setReorder(!reorder)
            console.log("red ", reorder)
        }
    };

    const optionsTray = [
        { name: `Turn Magnification ${!isMagnified ? "Off" : "On"}`, opt: "magnified", icon: <MagnifyingGlassPlusIcon className="size-4" />, subOptions: false, optionsTray: [] },
        { name: "Reorder Apps", opt: "reorder", icon: <ArrowsRightLeftIcon className="size-4" />, subOptions: false, optionsTray: [] },
        { name: "Icon Shapes", opt: "", icon: <Squares2X2Icon className="size-4" />, subOptions: true, optionsTray: [{ name: "Square", opt: "square", icon: "", subOptions: false }, { name: "Circle", opt: "circle", icon: "", subOptions: false }] },
    ];

    let reorderRef = useRef(null);

    const applyOption = (opt) => {
        if (opt) {
            // for magnifying icons
            if (opt === "magnified") {
                setIsMagnified(!isMagnified);
            }

            // for reorder icons
            if (opt === "reorder") {
                setReorder(!reorder);
                console.log("opt reorder ", reorder);
            }

            // for shape icons
            if (opt === "square" || opt === "circle") {
                setShape(opt);
            }

            // closes option menu
            setIsOption(!isOption);
            setSubOption(false);
            setMagnifiedEvent(!magnifiedEvent);
        }
    }

    return (
        <div className="relative h-dvh flex justify-center items-end p-4 select-none bg-blue-600" onClick={handleClickOutside}>
            {isOption && (
                <ul className="bg-[rgba(255,255,255,0.8)] px-2 py-2 grid rounded-xl absolute z-10 bottom-32 text-base text-black font-medium shadow" ref={optionRef} style={{ left: `${optionAxis - 24}px`, backdropFilter: "saturate(180%) blur(24px)" }}>
                    {optionsTray.map((tray) => (
                        <li key={tray.name}
                            className={`relative ${tray.subOptions ? "min-w-64 ps-4 pe-2 flex items-center justify-between gap-4" : "px-4"} cursor-pointer py-2 rounded-lg hover:text-white hover:bg-blue-600`}
                            onMouseOver={tray.subOptions ? () => setSubOption(true) : undefined}
                            onMouseOut={tray.subOptions ? () => setSubOption(false) : undefined}
                            onClick={() => applyOption(tray.opt)}
                        >
                            <span className="flex items-center gap-2">{tray.icon}{tray.name}</span>
                            {tray.subOptions && (
                                <>
                                    <ChevronRightIcon className="size-4" />
                                    {subOption && (
                                        <ul className="bg-[rgba(255,255,255,0.8)] px-2 py-2 grid rounded-xl absolute z-10 bottom-0 -right-[98.5px] text-base text-black font-medium shadow" style={{ backdropFilter: "saturate(180%) blur(24px)" }}>
                                            {tray.optionsTray?.map((subTray) => (
                                                <li key={subTray.name}
                                                    className={`${subTray.subOptions ? "min-w-64 ps-4 pe-2 flex items-center justify-between gap-4" : "px-4"} py-2 rounded-lg hover:text-white hover:bg-blue-600`}
                                                    onClick={() => applyOption(subTray.opt)}
                                                >
                                                    {subTray.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex bg-[rgba(255,255,255,0.32)] h-24 items-end gap-2 rounded-3xl p-4"
                style={{ backdropFilter: "saturate(180%) blur(24px)" }}
                onContextMenu={handleOptions}
                ref={reorderRef}
            >
                {reorder ? (
                    <Reorder.Group axis="x" values={apps} onReorder={setApps} className="flex items-end gap-2">
                        {apps.map((app) => (
                            <Reorder.Item key={app.name} value={app}>
                                <AppIcon
                                    mouseX={mouseX}
                                    name={app.name}
                                    bg={app.bg}
                                    icon={app.icon}
                                    bounce={app.bounce}
                                    magnifiedEvent={magnifiedEvent}
                                    isMagnified={isMagnified}
                                    shape={shape}
                                    reorder={reorder}
                                />
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                ) : (
                    apps.map((app) => (
                        <div key={app.name} value={app}>
                            <AppIcon
                                mouseX={mouseX}
                                name={app.name}
                                bg={app.bg}
                                icon={app.icon}
                                bounce={app.bounce}
                                magnifiedEvent={magnifiedEvent}
                                isMagnified={isMagnified}
                                shape={shape}
                                reorder={reorder}
                            />
                        </div>
                    ))
                )}
            </motion.div>
        </div>
    );
}

// eslint-disable-next-line react/prop-types
const AppIcon = ({ mouseX, name, bg, icon, bounce, magnifiedEvent, isMagnified, shape, reorder }) => {
    let ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    let widthSync = useTransform(
        distance,
        [-160, 0, 160],
        reorder || magnifiedEvent || isMagnified ? [64, 64, 64] : [64, 144, 64]
    );
    let width = useSpring(widthSync, { mass: 0.08, stiffness: 240, damping: 16 });
    let iconSizeSync = useTransform(widthSync, (w) => w * 0.64);
    let iconSize = useSpring(iconSizeSync, { mass: 0.08, stiffness: 240, damping: 16 });

    return (
        <motion.div
            ref={ref}
            style={{ width, backgroundColor: bg }}
            className={`aspect-square w-16 ${shape === "square" ? "rounded-xl" : "rounded-full"} bg-gray-500 flex items-center justify-center`}
            animate={reorder ? {translateX: [0, -2, 0, 2, 0, -2, 0], cursor: "grab"} : (!magnifiedEvent && !reorder && bounce && !isHovered ? { translateY: [0, -12, 0, -12, 0, -12, 0] } : { translateY: 0 })}
            transition={reorder ? {
                duration: 0.2,
                repeat: Infinity,
            } : (bounce && !isHovered) && {
                duration: 0.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1.6
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {icon && (
                <motion.img src={icon} alt={name} style={{ width: iconSize, height: iconSize , pointerEvents: 'none'}} />
            )}
        </motion.div>
    );
}

export default Dock;
