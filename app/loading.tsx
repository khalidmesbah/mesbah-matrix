export default function Loading() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="loader-container">
        <div className="loader-slice" />
        <div className="loader-slice" />
        <div className="loader-slice" />
        <div className="loader-slice" />
        <div className="loader-slice" />
        <div className="loader-slice" />
      </div>
    </div>
  );
}
