import { useMediaQuery } from "react-responsive";

export default function useDeviceSize() {
  let bestPageSizeCount = 3;

  const isDesktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1200px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:768px)",
  });

  if (isMobile) {
    bestPageSizeCount = 1;
  } else if (isTablet) {
    bestPageSizeCount = 2;
  } else if (isDesktop) {
    bestPageSizeCount = 3;
  }

  return { isDesktop, isTablet, isMobile, bestPageSizeCount };
}
