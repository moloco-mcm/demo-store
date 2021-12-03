import React from 'react';

type Props = {
  minimumVisibleRatio?: number;
  onVisible?: () => void;
  fireOnce?: boolean;
};

export const VisibilityChecker: React.FC<Props> = (props) => {
  const {
    minimumVisibleRatio = 0.5,
    fireOnce = true,
    children,
    onVisible,
  } = props;

  const childrenRef = React.useRef<HTMLElement | null>(null);
  const isFired = React.useRef<boolean>(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entires) => {
        const [entry] = entires;

        if (!entry) return;

        const { isIntersecting, intersectionRatio } = entry;

        if (
          (fireOnce ? !isFired.current : true) &&
          isIntersecting &&
          intersectionRatio >= minimumVisibleRatio
        ) {
          onVisible?.();
          isFired.current = true;
        }
      },
      { threshold: minimumVisibleRatio }
    );

    const currentRef = childrenRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fireOnce, minimumVisibleRatio, onVisible]);

  // accept only one child. throw error if there are multiple children
  const onlyChild = React.Children.only(children);

  const clonedChildren = React.isValidElement(onlyChild)
    ? React.cloneElement(onlyChild, {
        ref: childrenRef,
      })
    : children;

  return <>{clonedChildren}</>;
};
