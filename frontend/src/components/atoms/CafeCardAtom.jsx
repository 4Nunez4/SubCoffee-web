const CafeCardAtom = ({ title, img }) => (
  <div className="bg-gray-300 text-gray-500 rounded-lg p-4 h-52 transition-all duration-300 hover:scale-105">
    <h2 className="font-semibold text-sm text-center w-28">{title}</h2>
    <div
      className="bg-cover mt-4"
      style={{ backgroundImage: `url(./src/assets/${img})` }}
    ></div>
  </div>
);
export default CafeCardAtom;