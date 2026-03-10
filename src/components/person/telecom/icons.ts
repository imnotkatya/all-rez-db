import type { URLScheme } from "@bridg/api-ts";
import {
  IconMail,
  IconPhone,
  IconWorldWww,
  type IconProps,
} from "@tabler/icons-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

const icons: Record<
  URLScheme,
  ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
> = {
  tel: IconPhone,
  mailto: IconMail,
  ftp: IconWorldWww,
  http: IconWorldWww,
};

export default icons;
