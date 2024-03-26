import { ASCII_LOCK_BIN } from "@/lib/ascii-art";
import { type AllHTMLProps } from "@/lib/types.helpers";
import { cn } from "@/lib/utils";

const Designs = {
  lock: ASCII_LOCK_BIN,
};
interface Props extends AllHTMLProps<"section"> {
  design: keyof typeof Designs;
}

export const AsciiArt = ({ design, ...props }: Props) => {
  const artDesign = Designs[design].map((line, index) => {
    return <pre key={index}>{line}</pre>;
  });

  const classes = cn("grid justify-center", props.className);

  return (
    <section {...props} className={classes}>
      {artDesign}
    </section>
  );
};
