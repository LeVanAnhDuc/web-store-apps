// types
import type { ComponentProps } from "react";
// libs
import Image from "next/image";

const CustomImage = ({
  unoptimized = true,
  alt,
  ...props
}: ComponentProps<typeof Image>) => (
  <Image alt={alt} unoptimized={unoptimized} {...props} />
);

export default CustomImage;
