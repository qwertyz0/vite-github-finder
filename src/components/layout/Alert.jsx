import React, { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";

function Alert() {
  const { alert } = useContext(AlertContext);

  // NOTE: here we are using the alert component from DaisyUI which works better
  // with DaisyUI themes. If you have the Light theme from DaisyUI and can't see
  // the text in the alert then this is the change you need.
  // We also now conditionally hide the containing div rather than conditionally
  // render the alert, this prevents content shift when the alert shows.

  return (
    <div
      className={`grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-8 mb-4`}
      style={{ visibility: alert ? "visible" : "hidden" }}
    >
      <div className="alert alert-error">
        <div>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-current mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            ></path>
          </svg>
          <strong>{alert?.msg}</strong>
        </div>
      </div>
    </div>
  );

  //   return (
  //     alert !== null && (
  //       <p className="flex items-start mb-4 space-x-2">
  //         {alert.type === "error" && (
  //           <svg
  //             className="w-6 h-6 flex-none mt-0.5"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //           >
  //             <circle cx="12" cy="12" r="12" fill="#FECDD3"></circle>
  //             <path
  //               d="M8 8l8 8M16 8l-8 8"
  //               stroke="#B91C1C"
  //               strokeWidth="2"
  //             ></path>
  //           </svg>
  //         )}
  //         <p className="flex-1 text-base font-semibold leading-7 text-white">
  //           <strong>{alert.msg}</strong>
  //         </p>
  //       </p>
  //     )
  //   );
}

export default Alert;
