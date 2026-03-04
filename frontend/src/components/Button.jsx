function Button(props) {
  return (
    <button
      type="submit"
      className="
                w-full py-3 px-6 
                bg-gradient-to-r from-blue-500 to-purple-600
                text-white rounded-lg font-semibold text-lg
                hover:from-blue-600 hover:to-purple-700
                disabled:from-gray-400 disabled:to-gray-500 
                disabled:cursor-not-allowed
                transition-all duration-200 transform hover:scale-[1.02]
                shadow-lg hover:shadow-xl
              "
      // onClick={props.onClick}
    >
      {props.texto}
    </button>
  );
}
export default Button;
