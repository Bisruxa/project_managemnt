import clsx from 'clsx';
const Input =({className, ...props})=>{
  return (
    <input
      className={clsx(
        "rounded-3xl px-10 py-4 drop-shadow-xl bg-white border-solid border-2 border-gray-200 w-full",
        className
      )}
      {...props}
    />
  );
}