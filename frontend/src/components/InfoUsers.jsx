function InfoUsers() {
  return (
    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="text-sm text-blue-800 font-medium mb-2">
        Usuarios de prueba:
      </p>
      <div className="text-xs text-blue-700 space-y-1">
        <p>
          • <strong>juan</strong> / password123
        </p>
        <p>
          • <strong>ana</strong> / password123
        </p>
        <p>
          • <strong>carlos</strong> / password123
        </p>
      </div>
    </div>
  );
}
export default InfoUsers;
