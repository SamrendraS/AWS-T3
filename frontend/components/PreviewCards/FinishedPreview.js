const FinishedPreview = ({ id, taskName, taskURL, status, delay, result }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-sm w-full sm:w-full lg:w-full py-6 px-3">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
              {id}
            </p>
            <p className="text-3xl text-gray-900">{taskName}</p>
            <p className="text-gray-700">{taskURL}</p>
          </div>
          <div className="flex-col p-4 border-t border-gray-300 text-gray-700">
            <span className="text-gray-900 font-bold">Delay</span>: {delay} ms
            <br />
            <span className="text-gray-900 font-bold">Status</span>: {status}
          </div>
          <div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
            <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
              Result
            </div>
            {JSON.stringify(result) != JSON.stringify({}) ? (
              <div className="flex items-center pt-2 text-sm">
                {console.log(result.statusCode)}
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishedPreview;
