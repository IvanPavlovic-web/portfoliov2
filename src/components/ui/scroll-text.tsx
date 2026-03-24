import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";

type Direction = "left" | "right" | "up" | "down";

type TextAnimationProps = {
  text: string;
  classname?: string;
  variants?: Variants;
  as?: keyof HTMLElementTagNameMap;
  direction?: Direction;
  letterAnime?: boolean;
  lineAnime?: boolean;
  animate?: boolean;
};

const getDirectionOffset = (direction: Direction) => {
  switch (direction) {
    case "left":
      return { x: -40, y: 0 };
    case "right":
      return { x: 40, y: 0 };
    case "down":
      return { x: 0, y: 40 };
    default:
      return { x: 0, y: -40 };
  }
};

export default function TextAnimation({
  text,
  classname = "",
  variants,
  as = "div",
  direction = "up",
  letterAnime = false,
  lineAnime = false,
  animate,
}: TextAnimationProps) {
  const motionComponents = motion as unknown as Record<string, typeof motion.div>;
  const Component = motionComponents[as] ?? motion.div;

  const defaultVariants = useMemo<Variants>(() => {
    const { x, y } = getDirectionOffset(direction);
    return {
      hidden: { opacity: 0, filter: "blur(8px)", x, y },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    };
  }, [direction]);

  const activeVariants = variants ?? defaultVariants;
  const motionProps =
    animate === undefined
      ? {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, amount: 0.4 },
        }
      : {
          initial: "hidden" as const,
          animate: animate ? ("visible" as const) : ("hidden" as const),
        };

  if (letterAnime || lineAnime) {
    const segments = letterAnime ? text.split("") : text.split(" ");
    const renderText = segments.map((segment, index) => (
      <motion.span
        key={`${segment}-${index}`}
        className="text-anim-seg"
        variants={activeVariants}
      >
        {segment === " " ? "\u00A0" : segment}
        {!letterAnime && index < segments.length - 1 ? " " : ""}
      </motion.span>
    ));

    return (
      <Component
        className={classname}
        variants={{
          visible: { transition: { staggerChildren: letterAnime ? 0.03 : 0.06 } },
        }}
        {...motionProps}
      >
        {renderText}
      </Component>
    );
  }

  return (
    <Component className={classname} variants={activeVariants} {...motionProps}>
      {text}
    </Component>
  );
}
