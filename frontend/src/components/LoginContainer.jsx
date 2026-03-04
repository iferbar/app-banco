function LoginContainer(props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {props.children}
    </div>
  );
}

export default LoginContainer;
