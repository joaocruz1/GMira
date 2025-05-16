import { useScroll } from "framer-motion";
import { useRef } from "react";
import ParallaxBackground from "../about-page/parallax-background";

export default function Hero()  {
    const containerRef = useRef(null)
    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset : ["start start", "end end"]
    })

    return (
        <div ref={containerRef} className="min-h-screen bg-background text-primary">
            <ParallaxBackground scrollYProgress={scrollYProgress} />
            <div className="relative z-10">
                <h1>Teste</h1>
            </div>
        </div>
    )
}