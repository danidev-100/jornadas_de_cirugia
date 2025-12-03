import clsx from "clsx";

export function Container({ className, ...props }) {
  return (
    <div className={clsx(className)}>
      <div className="mx-auto max-w-7xl py-6 md:py-10 lg:py-14" {...props} />
    </div>
  );
}
