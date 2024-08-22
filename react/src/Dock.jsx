import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ReactIcon from "./assets/react.svg";
import TailwindCSSIcon from "./assets/tailwindcss.svg";
import JavaScriptIcon from "./assets/javascript.svg";
import NpmIcon from "./assets/npm.svg";
import FramerMotionIcon from "./assets/framermotion.svg";
import ExpressJSIcon from "./assets/expressjs.svg";
import GitHubIcon from "./assets/github.svg";
import FigmaIcon from "./assets/figma.svg";
import HTML5Icon from "./assets/html5.svg";
import VSCodeIcon from "./assets/vscode.svg";

function Dock() {
    const apps = [
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
    ];

    let mouseX = useMotionValue(Infinity);

    return (
        <div className="relative h-dvh flex justify-center items-end p-4 select-none"
            style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1633164442172-dc4147f21954?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex bg-[#ffffff67] h-20 items-end gap-2 rounded-3xl p-2"
                style={{ backdropFilter: "saturate(180%) blur(24px)" }}
            >
                {apps.map((i) => (
                    <AppIcon
                        mouseX={mouseX}
                        key={i.name}
                        name={i.name}
                        bg={i.bg}
                        icon={i.icon}
                        bounce={i.bounce}
                    />
                ))}
            </motion.div>
        </div>
    );
}

// eslint-disable-next-line react/prop-types
function AppIcon({ mouseX, name, bg, icon, bounce, onClick }) {
    let ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    let widthSync = useTransform(distance, [-160, 0, 160], [64, 144, 64]);
    let width = useSpring(widthSync, { mass: 0.2, stiffness: 240, damping: 16 });
    let iconSizeSync = useTransform(widthSync, (w) => w * 0.64);
    let iconSize = useSpring(iconSizeSync, { mass: 0.2, stiffness: 240, damping: 16 });

    return (
        <motion.div
            ref={ref}
            style={{ width, backgroundColor: bg }}
            className="aspect-square w-16 rounded-full bg-gray-500 flex items-center justify-center"
            animate={bounce && !isHovered ? { translateY: [0, -12, 0, -12, 0, -12, 0] } : { translateY: 0 }}
            transition={(bounce && !isHovered) && {
                duration: 0.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1.6
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {icon && (
                <motion.img src={icon} alt={name} style={{ width: iconSize, height: iconSize }} />
            )}
        </motion.div>
    );
}

export default Dock;
